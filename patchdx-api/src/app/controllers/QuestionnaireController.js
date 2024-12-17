import nodemailer from "nodemailer";
import Cryptr from "cryptr";
import { constants } from '../../GlobalConstants'
import { questionnaire, questionnaireRecord } from '../models/questionnaire';
import questionnaireResponse from '../models/questionnaireResponse';
import { QESTIONNAIRE_MAIL_TEXT } from "../../GlobalConstants";

module.exports = {
  // Login
  saveQuestionnaireForm: async (req, res) => {
    const {
      formData,
      formName, customFormId,
    } = req.body;
    try {
      if (!formData || !formName) {
        return res.status(400).json({
          message: 'All input is required',
          success: false,
        });
      }
      const params = {
        formName,
        fields: formData,
        createdBy: req.userId,
        updatedBy: req.userId,
        modifiedBy: req.userId,
      };
      if (customFormId !== '' && customFormId !== undefined) {
        await questionnaire.findByIdAndUpdate({ _id: customFormId }, { $set: params }, { new: true });
      } else {
        const saveForm = await new questionnaire(params);
        await saveForm.save();
      }

      return res.status(200).json({
        success: true,
        message: 'Questionnaire form created successfully',
        data: {},
      });
    } catch (err) {
      console.log('err', err);
      return res.status(400).json({
        success: false,
        message: 'There is some problem please try again later',
      });
    }
  },

  getQuestionnaire: async (req, res) => {
    try {
      const questionnaires = await questionnaire.find({ createdBy: req.userId }).sort({ timestamps: 1 });
      res.status(200).json(questionnaires);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal server error', success: false });
    }
  },

  getSingleQuestionnaire: async (req, res) => {
    const { id } = req.query;
    try {
      const data = await questionnaire.findById(id);
      return res
        .status(200)
        .json({ success: true, message: 'Custom form Fetched successfully', data });
    } catch (error) {
      console.log('err', error);
      return res.status(400).json({
        success: false,
        message: 'There is some error please try again later',
      });
    }
  },

  checkQuestionnaireExist: async (req, res) => {
    const { formData } = req.body;
    try {
      if (!formData) {
        return res.status(400).json({
          message: 'Input is required',
          success: false,
        });
      }
      const checkName = await questionnaire.findOne({
        formName: { $regex: new RegExp(`^${formData}$`, 'i') },
        createdBy: req.userId,
      });
      if (checkName) {
        return res
          .status(200)
          .json({ success: false, message: 'Questionnaire already exists' });
      }
      return res.status(200).json({ success: true, message: '' });
    } catch (err) {
      console.log('err', err);
      return res.status(400).json({
        success: false,
        message: 'There is some problem, please try again later',
      });
    }
  },

  sendQuestionnaireMail: async (req, res) => {
    const { id, questionnaire, email } = req.body
    const crypter = new Cryptr(process.env.CRYPTR_KEY)
    let patients = [];
    const questionnaireLink = constants.questionnaireUrl.replace('#baseurl#', process.env.BASE_URL).replace('#patientid#', crypter.encrypt(id))
      .replace('#questionnaireid#', crypter.encrypt(questionnaire));
    const query = {
      $or: [
        { questionnaireId: questionnaire },
      ],
      $and: [
        { patientId: id },
      ],
    };
    patients = await questionnaireRecord.find(query);
    if (!patients.length > 0) {
      const form = {
        questionnaireId: questionnaire,
        patientId: id,
      }

      const saveForm = await new questionnaireRecord(form);
      await saveForm.save();
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDER_EMAIL_ID,
        pass: process.env.SENDER_EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "PatchDx",
        address: process.env.SENDER_EMAIL_ID,
      }, // sender address
      to: email, // list of receivers
      subject: "Questionnaire URL", // Subject line
      text: QESTIONNAIRE_MAIL_TEXT(questionnaireLink), // plain text body
    };

    const sendMail = (transporter, mailOptions) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }
    sendMail(transporter, mailOptions)

    return res.status(200).json({
      message: "Questionnaire URL send",
      success: true,
    });
  },

  copyQuestionnaireLink: async (req, res) => {
    const { id, questionnaire } = req.body
    const crypter = new Cryptr(process.env.CRYPTR_KEY)
    let patients = [];
    const questionnaireLink = constants.questionnaireUrl.replace('#baseurl#', process.env.BASE_URL).replace('#patientid#', crypter.encrypt(id))
      .replace('#questionnaireid#', crypter.encrypt(questionnaire));
    const query = {
      $or: [
        { questionnaireId: questionnaire },
      ],
      $and: [
        { patientId: id },
      ],
    };
    patients = await questionnaireRecord.find(query);
    if (!patients.length > 0) {
      const form = {
        questionnaireId: questionnaire,
        patientId: id,
      }

      const saveForm = await new questionnaireRecord(form);
      await saveForm.save();
    }
    return res.status(200).json({
      message: "Successfully copied",
      success: true,
      url: questionnaireLink,
    });
  },

  getQuestionnaireForm: async (req, res) => {
    const { id } = req.query;
    try {
      const crypter = new Cryptr(process.env.CRYPTR_KEY)
      const questionnaireId = crypter.decrypt(id)
      const data = await questionnaire.findById(questionnaireId);
      return res
        .status(200)
        .json({ success: true, message: 'Questionnaire form fetched successfully', data });
    } catch (error) {
      console.log('err', error);
      return res.status(400).json({
        success: false,
        message: 'There is some error please try again later',
      });
    }
  },

  submitQuestionnaireResponses: async (req, res) => {
    const {
      patientId,
      questionnaireId, question, answer
    } = req.body;
    try {
      if (!patientId || !questionnaireId) {
        return res.status(200).json({
          message: 'Failed to submit',
          success: false,
        });
      }

      const crypter = new Cryptr(process.env.CRYPTR_KEY)
      const quesId = crypter.decrypt(questionnaireId);
      const patId = crypter.decrypt(patientId);
      await questionnaireRecord.updateOne(
        {
          "patientId": patId,
          "questionnaireId": quesId
        },
        {
          $set: {
            updatedAt: Date.now,
          }
        }
      );
      const params = {
        patientId: patId,
        questionnaireId: quesId,
        patientResponse: [],
        createdBy: req.userId,
        updatedBy: req.userId,
        modifiedBy: req.userId,
      };
      for (let index = 0; index < question.length; index++) {
        const ques = question[index];
        const ans = answer[index];
        params.patientResponse.push({ question: ques, answer: ans });
      }
      const saveForm = await new questionnaireResponse(params);
      await saveForm.save();

      return res.status(200).json({
        success: true,
        message: 'Questionnaire form created successfully',
        data: {},
      });
    } catch (err) {
      console.log('err', err);
      return res.status(400).json({
        success: false,
        message: 'There is some problem please try again later',
      });
    }
  },

  getPatientQuestionnaires: async (req, res) => {
    const { id } = req.query;
    try {
      const data = await questionnaireResponse.aggregate([{
        $match: { $expr: { $eq: ['$patientId', { $toObjectId: id }] } }
      },
      {
        $lookup:
        {
          from: 'questionnaires',
          localField: 'questionnaireId',
          foreignField: '_id',
          as: 'questionnaire'
        }
      },
      {
        $unwind:
        {
          path: '$questionnaire',
          preserveNullAndEmptyArrays: false,
        }
      },
      {
        $lookup:
        {
          from: 'questionnairerecords',
          localField: 'questionnaireId',
          foreignField: 'questionnaireId',
          as: 'questionnaireRecord'
        }
      },
      ])
      return res
        .status(200)
        .json({ success: true, message: 'Custom form Fetched successfully', data });
    } catch (error) {
      console.log('err', error);
      return res.status(400).json({
        success: false,
        message: 'There is some error please try again later',
      });
    }
  },

  checkIfResponseExist: async (req, res) => {
    const { patientId, questionnaireId } = req.query;
    try {
      const crypter = new Cryptr(process.env.CRYPTR_KEY)
      const encryptedPatId = crypter.decrypt(patientId);
      const encryptedQuesId = crypter.decrypt(questionnaireId);
      const query = {
        $and: [
          { patientId: encryptedPatId },
          { questionnaireId: encryptedQuesId },
        ],
      };
      const data = await questionnaireResponse.find(query);
      if (data.length > 0) {
        return res
          .status(200)
          .json({ success: true });
      } else {
        return res
          .status(200)
          .json({ success: false });
      }

    } catch (error) {
      console.log('err', error);
      return res.status(400).json({
        success: false,
        message: 'There is some error please try again later',
      });
    }
  },
};

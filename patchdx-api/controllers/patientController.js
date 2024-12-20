const patientModel = require('../models/patient');
const user = require('../models/user');


module.exports = {
  // Login
  savePatientForm: async (req, res) => {
    const {
      firstName,
      lastName, email, phoneNumber, dateOfBirth, questionnaire,
    } = req.body;
    try {
      const params = {
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        questionnaire,
        createdBy: req.userId,
        updatedBy: req.userId,
      };
      //   if (customFormId !== "" && customFormId !== undefined) {
      //     await customForm.findByIdAndUpdate({ _id: customFormId }, { $set: params }, { new: true })
      //   }
      const saveForm = await new patientModel(params);
      await saveForm.save();

      return res.status(200).json({
        success: true,
        message: 'Patient registered successfully',
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

  getPatients: async (req, res) => {
    try {
      const searchData = req.query.data;
      let patients = [];
      if (!searchData) {
        patients = await patientModel.aggregate([{
          $match: { $expr: { $eq: ['$createdBy', { $toObjectId: req.userId }] } }
        },
        {
          $sort: { createdAt: -1 }
        },
        {
          $lookup:
          {
            from: 'questionresponses',
            localField: '_id',
            foreignField: 'patientId',
            as: 'questionnaireResponses'
          }
        },
        {
          $lookup:
          {
            from: 'vendorordersummaries',
            localField: '_id',
            foreignField: 'patientId',
            as: 'vendorOrders',
            "pipeline": [
              { "$sort": { "_id": -1 } },
              { "$limit": 1 }
            ]
          }
        },
        ])
      } else if (searchData?.patientName && searchData?.dateOfBirth) {
        const query = {
          $or: [
            { firstName: { $regex: searchData?.patientName, $options: 'i' } },
            { lastName: { $regex: searchData?.patientName, $options: 'i' } },
          ],
          $and: [
            { dateOfBirth: { $gte: new Date(searchData?.dateOfBirth) } },
            { dateOfBirth: { $lte: new Date(searchData?.dateOfBirth) } },
          ],
        };
        patients = await patientModel.aggregate([{
          $match: query
        },
        {
          $lookup:
          {
            from: 'questionresponses',
            localField: '_id',
            foreignField: 'patientId',
            as: 'questionnaireResponses'
          }
        },
        {
          $lookup:
          {
            from: 'vendorordersummaries',
            localField: '_id',
            foreignField: 'patientId',
            as: 'vendorOrders'
          }
        },
        ])
      } else {
        const query = {
          $or: [
            { firstName: { $regex: searchData, $options: 'i' } },
            { lastName: { $regex: searchData, $options: 'i' } },
            { email: { $regex: searchData, $options: 'i' } },
            { phoneNumber: { $regex: searchData, $options: 'i' } },
          ],
        };
        //patients = await patientModel.find(query).sort({ createdAt: -1 });

        patients = await patientModel.aggregate([{
          $match: query
        },
        {
          $lookup:
          {
            from: 'questionresponses',
            localField: '_id',
            foreignField: 'patientId',
            as: 'questionnaireResponses'
          }
        },
        {
          $lookup:
          {
            from: 'vendorordersummaries',
            localField: '_id',
            foreignField: 'patientId',
            as: 'vendorOrders'
          }
        },
        ])
      }
      res.status(200).json(patients);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal server error', success: false });
    }
  },

  getPatientsByName: async (req, res) => {
    try {
      const { patientName, dateOfBirth } = req.query.data;
      let patients = [];

      const query = {
        $or: [
          { firstName: { $regex: patientName, $options: 'i' } },
          { lastName: { $regex: patientName, $options: 'i' } },
        ],
        $and: [
          { dateOfBirth: { $gte: new Date(dateOfBirth) } },
          { dateOfBirth: { $lte: new Date(dateOfBirth) } },
        ],
      };
      patients = await patientModel.find(query);

      res.status(200).json(patients);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal server error', success: false });
    }
  },

  getUserDetails: async (req, res) => {
    try {

      // check user email
      const userDetail = await user.findById(req.userId);
      if (!user) {
        return res.status(400).json({
          success: false,
          Message: 'User record does not exist',
          userDetail,
        });
      }
      return res.status(200).json({
        success: true,
        Message: 'Fetch user details successfully',
        userDetail,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  updateUserDetails: async (req, res) => {
    try {
      const userData = req.body;
      const updatedData = {
        ...userData,
        phone_number: userData.phoneNumber,
        date_of_birth: userData.dateOfBirth,
        updated_at: new Date(),
      };
      // check user email
      const userDetail = await user.findByIdAndUpdate(req.userId,
        updatedData,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        Message: 'User updated successfully',
        userDetail,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

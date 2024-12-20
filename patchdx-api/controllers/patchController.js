const { individualAllergen, allergenGroup } = require('../models/individualAllergen');
const patchOrderModel = require('../models/patchOrder');
const patientModel = require('../models/patient');
const vendorOrderSummaryModel = require('../models/vendorOrderSummary');


module.exports = {
  getIndividualAllergen: async (req, res) => {
    try {
      const searchData = req.query.data;
      let allergens = [];
      if (!searchData) {
        allergens = await individualAllergen.find();
        return res.status(200).json({ success: true, allergens });
      } else {
        const query = {
          $or: [
            { variableName: { $regex: searchData, $options: 'i' } },
            { displayName: { $regex: searchData, $options: 'i' } },
          ],
        };
        allergens = await individualAllergen.find(query);

        return res.status(200).json({ success: true, allergens });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal server error', success: false });
    }
  },

  getGroupAllergen: async (req, res) => {
    try {
      const searchData = req.query.data;
      let allergens = [];
      if (!searchData) {
        return res.status(200).json({ success: true, allergens });
      }
      const query = {
        $or: [
          { groupName: { $regex: searchData, $options: 'i' } },
        ],
      };
      allergens = await allergenGroup.find(query);
      return res.status(200).json({ success: true, allergens });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal server error', success: false });
    }
  },

  submitPatchOrder: async (req, res) => {
    const {
      patientId,
      groupAllergen,
      individualAllergen,
    } = req.body;
    try {
      groupAllergen.gAllergens.shift();
      individualAllergen.individualAllergens.shift();
      if (!patientId) {
        return res.status(400).json({
          message: 'All input is required',
          success: false,
        });
      }

      const params = {
        groupNames: groupAllergen.gAllergens,
        individualAllergens: individualAllergen.individualAllergens,
        patientId: patientId,
        createdBy: req.userId,
        updatedBy: req.userId,
        modifiedBy: req.userId,
      };

      const saveForm = await new patchOrderModel(params);
      await saveForm.save();

      return res.status(200).json({
        success: true,
        message: 'Patch order created successfully',
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

  fetchPathOrders: async (req, res) => {
    try {
      const searchData = req.query.data;
      const patchOrders = await patchOrderModel.aggregate([{
        $match: {
          $and: [{ $expr: { $eq: ['$patientId', { $toObjectId: searchData }] } },
          { $expr: { $eq: ['$createdBy', { $toObjectId: req.userId }] } }]
        },
      }, {
        $sort: { timestamps: -1 }
      },
      {
        $lookup:
        {
          from: 'patients',
          localField: 'patientId',
          foreignField: '_id',
          as: 'patient'
        }
      },
      {
        $unwind:
        {
          path: '$patient',
          preserveNullAndEmptyArrays: false,
        }
      },
      {
        $lookup:
        {
          from: 'vendorordersummaries',
          localField: '_id',
          foreignField: 'patchOrderId',
          as: 'orderSummeries'
        },
      },
      {
        $unwind:
        {
          path: '$orderSummeries',
          preserveNullAndEmptyArrays: true,
        }
      },

      ])
      return res.status(200).json({ success: true, patchOrders });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal server error', success: false });
    }
  },

  fetchVendorOrderTests: async (req, res) => {
    try {
      const searchData = req.query.data;

      const vendorOrders = await vendorOrderSummaryModel.aggregate([{
        $match: {
          $and: [{ $expr: { $eq: ['$patientId', { $toObjectId: searchData }] } },
          { $expr: { $eq: ['$createdBy', { $toObjectId: req.userId }] } }]
        },
      }, {
        $sort: { timestamps: -1 }
      },
      {
        $lookup:
        {
          from: 'patients',
          localField: 'patientId',
          foreignField: '_id',
          as: 'patient'
        }
      },
      {
        $unwind:
        {
          path: '$patient',
          preserveNullAndEmptyArrays: false,
        }
      },
      ])
      return res.status(200).json({ success: true, vendorOrders });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal server error', success: false });
    }
  },

  submitVendorOrderSummary: async (req, res) => {
    const {
      queryParam,
      allergens,
    } = req.body;
    try {
      if (!queryParam.patientId && queryParam.patchOrderId) {
        return res.status(400).json({
          message: 'All input is required',
          success: false,
        });
      }

      const params = {
        patientId: queryParam.patientId,
        patchOrderId: queryParam.patchOrderId,
        patchTests: [],
        createdBy: req.userId,
        updatedBy: req.userId,
        modifiedBy: req.userId,
      };

      if (queryParam.patientId && queryParam?.orderId) {
        await vendorOrderSummaryModel.findByIdAndUpdate(queryParam.orderId,
          { $set: { patchTests: allergens } },
          { new: true }
        );
        return res.status(200).json({
          success: true,
          message: 'Vendor order updated successfully',
        });
      }

      for (let index = 0; index < allergens.length; index++) {
        params.patchTests.push({ title: allergens[index], reaction: '', reactionDate: '' })

      }

      const saveForm = await new vendorOrderSummaryModel(params);
      await saveForm.save();

      return res.status(200).json({
        success: true,
        message: 'Vendor order submitted successfully',
      });
    } catch (err) {
      console.log('err', err);
      return res.status(400).json({
        success: false,
        message: 'There is some problem please try again later',
      });
    }
  },

  fetchPatchResults: async (req, res) => {
    try {
      const searchData = req.query.data;

      const vendorOrders = await vendorOrderSummaryModel.aggregate([{
        $match: {
          $and: [{ $expr: { $eq: ['$patientId', { $toObjectId: searchData }] } },
          { $expr: { $eq: ['$createdBy', { $toObjectId: req.userId }] } }]
        },
      }, {
        $sort: { timestamps: -1 }
      },
      ])
      return res.status(200).json({ success: true, vendorOrders });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal server error', success: false });
    }
  },

  fetchReactedAllergens: async (req, res) => {
    try {
      const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
      const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));
      const reactedAllergens = await vendorOrderSummaryModel.aggregate([
        {
          $match: {
            patchTests: {
              $elemMatch: {
                reactionDate: { $gte: startOfDay,$lte: endOfDay } // Filter for events with a date greater than or equal to now
              }
            }
          }
        },
        {
          $project: {
            patchTests: {
              $filter: {
                input: "$patchTests",          // The array to filter
                as: "patchTest",               // Variable for each element
                cond: {
                  $and: [
                    { $gte: ["$$patchTest.reactionDate", startOfDay] },
                    { $lte: ["$$patchTest.reactionDate", endOfDay] }
                  ]
                } // Condition for filtering
              }
            }
          }
        }
      ]);
      return res.status(200).json({ success: true, reactedAllergens });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal server error', success: false });
    }
  },
};

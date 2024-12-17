const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'patient',
        },
        patchOrderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'patchOrder',
        },
        patchTests: [{
            title: {
                type: String,
            },
            reaction: {
                type: String,
            },
            reactionDate: {
                type: Date,
            }
        }],
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        updatedAt: {
            default: Date.now,
            type: Date,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    }, {
    timestamps: true,
},
);

const vendorOrderSummaryModel = mongoose.model('vendorOrderSummary', schema);

module.exports = vendorOrderSummaryModel;

const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
    },
    questionnaireId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questionnaires',
    },
    patientResponse: [{
        question: {
            type: String,
        },
        answer: {
            type: String,
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
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = mongoose.model('questionResponse', questionSchema);

import { template } from 'lodash';
import { letterTemplate, summaryLetter } from '../models/letterTemplate';

module.exports = {
    // Login
    createLetterTemplate: async (req, res) => {
        const {
            id,
            templateJson,
            templateName,
        } = req.body;
        try {
            const params = {
                templateName,
                template: templateJson,
                createdBy: req.userId,
                updatedBy: req.userId,
            };
            if (id === '') {
                const saveForm = await new letterTemplate(params);
                await saveForm.save();
            } else {
                await letterTemplate.findByIdAndUpdate(id,
                    params,
                    { new: true }
                );
                return res.status(200).json({
                    success: true,
                    message: 'Letter template updated successfully!',
                    data: {},
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Letter template saved successfully!',
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

    fetchLetterTemplate: async (req, res) => {
        try {
            let templates = [];
            templates = await letterTemplate.aggregate([{
                $match: { $expr: { $eq: ['$createdBy', { $toObjectId: req.userId }] } }
            },
            {
                $sort: { createdAt: -1 }
            },
            ])
            res.status(200).json(templates);
        } catch (error) {
            res
                .status(500)
                .json({ message: 'Internal server error', success: false });
        }
    },

    getSingleLetterTemplate: async (req, res) => {
        const { id } = req.query;
        try {
            const templates = await letterTemplate.findById(id);
            res.status(200).json(templates);
        } catch (error) {
            res
                .status(500)
                .json({ message: 'Internal server error', success: false });
        }
    },

    createSummaryLetter: async (req, res) => {
        const {
            templateId,
            patientId,
            letter,
        } = req.body;
        try {
            const params = {
                templateId,
                patientId,
                summaryLetter: letter,
                createdBy: req.userId,
                updatedBy: req.userId,
            };
            const letterData = await summaryLetter.findOne({ patientId });
            if (letterData) {
                await summaryLetter.findOneAndUpdate({ patientId },
                    params,
                    { new: true }
                );
                return res.status(200).json({
                    success: true,
                    message: 'Summary letter updated successfully!',
                    data: {},
                });
            } else {
                const saveForm = await new summaryLetter(params);
                await saveForm.save();
            }

            return res.status(200).json({
                success: true,
                message: 'Summary letter saved successfully!',
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

    getSingleSummaryLetter: async (req, res) => {
        const { id } = req.query;
        try {
            const letter = await summaryLetter.find({ patientId: id });
            res.status(200).json(letter);
        } catch (error) {
            res
                .status(500)
                .json({ message: 'Internal server error', success: false });
        }
    },
};

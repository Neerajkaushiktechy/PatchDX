const { Router } = require('express');
const patientController = require('../controllers/patientController');

const patientRouter = Router();
patientRouter.post('/submit-patient-form', patientController.savePatientForm);

patientRouter.get('/get-patient', patientController.getPatients);

patientRouter.get('/get-patient-by-name', patientController.getPatientsByName);

patientRouter.get('/get-user-details', patientController.getUserDetails);

patientRouter.put('/update-user-details', patientController.updateUserDetails);

module.exports = patientRouter;

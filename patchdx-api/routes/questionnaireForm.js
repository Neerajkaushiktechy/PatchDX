const { Router } = require('express');
const QuestionnaireController = require('../controllers/QuestionnaireController');

  const formRouter = Router();

  formRouter.get('/get-questionnaire-form',QuestionnaireController.getQuestionnaireForm);
  formRouter.post('/submit-questionnaire-form-response',QuestionnaireController.submitQuestionnaireResponses);

  module.exports= formRouter;

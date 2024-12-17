import { Router } from 'express';
import QuestionnaireController from '../controllers/QuestionnaireController';

export default () => {
  const formRouter = Router();

  formRouter.get('/get-questionnaire-form',QuestionnaireController.getQuestionnaireForm);
  formRouter.post('/submit-questionnaire-form-response',QuestionnaireController.submitQuestionnaireResponses);

  return formRouter;
};

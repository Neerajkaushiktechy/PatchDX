import { Router } from 'express';
import QuestionnaireController from '../controllers/QuestionnaireController';

export default () => {
  const questionaireRouter = Router();
  questionaireRouter.post('/submit-questionnaire-form',QuestionnaireController.saveQuestionnaireForm);

  questionaireRouter.get('/get-questionnaire',QuestionnaireController.getQuestionnaire);

  questionaireRouter.get('/get-single-questionnaire',QuestionnaireController.getSingleQuestionnaire);

  questionaireRouter.post('/check-questionnaire-exist', QuestionnaireController.checkQuestionnaireExist);

  questionaireRouter.post('/send-questionnaire-link', QuestionnaireController.sendQuestionnaireMail);

  questionaireRouter.post('/copy-questionnaire-link', QuestionnaireController.copyQuestionnaireLink);

  questionaireRouter.get('/get-patient-questionnaire', QuestionnaireController.getPatientQuestionnaires);

  questionaireRouter.get('/check-response-exist', QuestionnaireController.checkIfResponseExist);


  return questionaireRouter;
};

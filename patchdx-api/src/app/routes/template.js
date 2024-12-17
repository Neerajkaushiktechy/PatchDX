import { Router } from 'express';
import templateController from '../controllers/templateController';

export default () => {
  const templateRouter = Router();

  templateRouter.post('/submit-letter-template', templateController.createLetterTemplate);
  templateRouter.get('/fetch-letter-template', templateController.fetchLetterTemplate);
  templateRouter.get('/get-single-letter-template', templateController.getSingleLetterTemplate);
  templateRouter.get('/get-single-summary-letter', templateController.getSingleSummaryLetter);
  templateRouter.post('/submit-summary-letter', templateController.createSummaryLetter);

  return templateRouter;
};

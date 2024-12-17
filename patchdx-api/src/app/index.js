import { Router } from 'express';
import signinUser from './routes/signinUser';
import Questionnaire from './routes/Questionnaire';
import patient from './routes/patient';
import patch from './routes/patch';
import template from './routes/template';
import questionnaireForm from './routes/questionnaireForm';
import Auth from './helper/AuthHelper';

export default () => {
  const apiRouter = Router();
  apiRouter.get('/', async (req, res) => {
    try {
      res.status(200).json({
        status: 'active',
        dbAvailable: true,
      });
    } catch (error) {
      console.log(error);
      // res.status(200).json({
      //   status: 'active',
      //   dbAvailable: false,
      //   dbError: error.message,
      // });
    }
  });

  apiRouter.use('/user', signinUser());
  apiRouter.use('/questionnaire', Auth.isAuthenticated, Questionnaire());
  apiRouter.use('/patient', Auth.isAuthenticated, patient());
  apiRouter.use('/patch', Auth.isAuthenticated, patch());
  apiRouter.use('/letter', Auth.isAuthenticated, template());
  apiRouter.use('/public', questionnaireForm());
  return apiRouter;
};

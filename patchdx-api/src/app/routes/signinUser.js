import { Router } from 'express';
import authController from '../controllers/authController';

export default () => {
  const authRouter = Router();
  // authRouter.post('/sign-in',
  //   async (req, res) => {
  //     try {
  //       const data = await authController.userLogin(req, res);
  //       return res.status(200).json(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });

    authRouter.post('/sign-in',authController.userLogin);
    authRouter.get('/log-out',authController.userLogout);

  return authRouter;
};

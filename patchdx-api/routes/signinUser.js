const { Router } = require('express');
const authController = require('../controllers/authController');


  const authRouter = Router();
  authRouter.get('/', async (req, res) => {
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

    authRouter.post('/sign-in',authController.userLogin);
    authRouter.get('/log-out',authController.userLogout);

  module.exports= authRouter;

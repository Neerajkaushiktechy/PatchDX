const { Router } = require('express');
const signinUser = require('./routes/signinUser');
const Questionnaire = require('./routes/Questionnaire');
const patient = require('./routes/patient');
const patch = require('./routes/patch');
const template = require('./routes/template');
const questionnaireForm = require('./routes/questionnaireForm');
const Auth = require('./helper/AuthHelper');

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
apiRouter.use('/user', signinUser);
apiRouter.use('/questionnaire', Auth.isAuthenticated, Questionnaire);
apiRouter.use('/patient', Auth.isAuthenticated, patient);
apiRouter.use('/patch', Auth.isAuthenticated, patch);
apiRouter.use('/letter', Auth.isAuthenticated, template);
apiRouter.use('/public', questionnaireForm);
module.exports = apiRouter;


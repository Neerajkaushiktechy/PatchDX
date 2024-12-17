import http from 'http';
import express from 'express';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
// import cron from 'node-cron'

// dotenv for env variables on cross platform (linux, windows, etc)
import rootPath from '../rootpath';

// Access the Auth endpoints
import api from './app';

let envPath = process.env.NODE_ENV === 'test' ? 'features.env' : '.env';
envPath = path.resolve(rootPath, `./${envPath}`);
dotenv.config({ silent: true, path: envPath });

const app = express();
const server = http.createServer(app);
server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;
// Ensure the headersTimeout is set higher than the keepAliveTimeout due to this nodejs regression bug: https://github.com/nodejs/node/issues/27363

const { ORIGIN, SESSION_VALID_DAYS, FRONTEND_URL,CRYPTR_KEY,BASE_URL } = process.env;
const maxAge = (SESSION_VALID_DAYS) * 24 * 60 * 60 * 1000;
app.use(cookieSession({
  name: 'session',
  keys: ['Patch', 'Dx'],
  maxAge, // max age of 60 days
  sameSite: 'strict',
  httpOnly: true,
  secureProxy: true,
  domain: FRONTEND_URL,
}));

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (ORIGIN.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true,
      optionsSuccessStatus: 200,
      methods: 'GET,PUT,POST,DELETE',
    };
    // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false };
    // disable CORS for this request
  }
  callback(null, corsOptions);
  // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

app.use(helmet());

app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cookieParser('PatchDx'));
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/api', api());

server.listen(process.env.PORT || 5000);

mongoose.connect('mongodb+srv://dharmusingh0997:REYKq1K7whMPwj9H@cluster0.vkpoadi.mongodb.net/patchdx',
  (err, client) => {
    console.log('Connected to mongo DB');
    server.on('listening', () => {
      console.log('Server is running at port 5000');
    });
  });
module.exports = app;

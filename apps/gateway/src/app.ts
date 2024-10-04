import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import httpStatus from 'http-status';
import cors from 'cors';
import config from './config/config';
import ApiError from './utils/api_error';
import { authLimiter } from './middlewares/rate_limiter';
import morganMiddleware from './middlewares/morgan';
import xss from './middlewares/xss';
import setupProxies from './proxy';
import ROUTES from './routesConfig';
import routes from './routes/v1';

const app = express();

const corsOptions = {
  origin: '*',
};

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// sanitize request data
app.use(xss());

// cors middleware
app.use(cors(corsOptions));

// logger middleware
app.use(morganMiddleware); 

// setup proxies
setupProxies(app, ROUTES);

// alive test server
app.get('/', (req, res) => {
  res.send('hello world')
})

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);


app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

export default app;
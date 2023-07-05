import express from 'express';
import errorHandler from './middlewares/error-handler-middleware';
import apiRoute from './routes/api-route';

const app = express();

app.use(express.json());

app.use(apiRoute);

app.use(errorHandler);

export default app;

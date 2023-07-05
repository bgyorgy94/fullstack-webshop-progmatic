import express from 'express';
import errorHandler from './middlewares/error-handler-middleware';
import apiRoute from './routes/api-route';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use(apiRoute);

app.use(errorHandler);

export default app;

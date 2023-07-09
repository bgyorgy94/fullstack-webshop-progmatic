import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/error-handler-middleware';
import apiRoute from './routes/api-route';
import authRoute from './routes/auth-route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoute);
app.use('/auth', authRoute);

app.use(errorHandler);

export default app;

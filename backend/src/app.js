import express from 'express';
import multer from 'multer';
import cors from 'cors';
import errorHandler from './middlewares/error-handler-middleware';
import apiRoute from './routes/api-route';
import authRoute from './routes/auth-route';

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json({
      message: `Uploaded the file successfully: ${req.file.originalname}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}`,
    });
  }
});

app.use(cors());
app.use(express.json());

app.use('/api', apiRoute);
app.use('/auth', authRoute);

app.use(errorHandler);

export default app;

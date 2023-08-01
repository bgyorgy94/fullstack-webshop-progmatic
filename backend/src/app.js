import path from 'path';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import errorHandler from './middlewares/error-handler-middleware';
import apiRoute from './routes/api-route';
import authRoute from './routes/auth-route';
import { Products } from './database/connection';

const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { productId, title, price, description, categoryId } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;

    let product;

    if (productId) {
      product = await Products.findByPk(productId);
    } else {
      product = await Products.create({
        title,
        price,
        description,
        categoryId,
      });
    }

    product.imagepath = imagePath;
    await product.save();

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

app.use(express.json());

app.use('/api', apiRoute);
app.use('/auth', authRoute);

app.use(errorHandler);

export default app;

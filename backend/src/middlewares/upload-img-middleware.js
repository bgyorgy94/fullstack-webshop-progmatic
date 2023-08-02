import multer from 'multer';
import { nanoid } from 'nanoid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${nanoid(16)}.jpeg`);
  },
});

const upload = multer({ storage });

export default function uploadImg(imageFieldName) {
  return upload.single(imageFieldName);
}

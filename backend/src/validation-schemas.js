import * as yup from 'yup';

export const productSchema = yup.object({
  title: yup.string().required().min(3).max(32),
  price: yup.number().required().positive().integer(),
  description: yup.string().nullable(),
  categoryId: yup.string().nullable(),
});

export const categorySchema = yup.object({
  name: yup.string().required().min(3).max(32),
});

export const authSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(255),
});

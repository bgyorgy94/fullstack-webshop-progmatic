import * as yup from 'yup';

export const productSchema = yup.object({
  title: yup.string().required().min(3).max(16),
  price: yup.number().required().positive().integer(),
  description: yup.string().nullable(),
  categoryId: yup.string().nullable(),
});

export const categorySchema = yup.string().required().min(3).max(16);

// authschema

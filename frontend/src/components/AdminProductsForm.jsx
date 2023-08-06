import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { objectToFormData } from '../utils';
import privateApi from '../api/privateApi';
import { useFormik } from 'formik';
import useCategories from '../hooks/useCategories';

export default function AdminProductsForm({ product }) {
  const { categories } = useCategories();
  const formik = useFormik({
    initialValues: {
      title: product ? product.title : '',
      price: product ? product.price : '',
      categoryId: product ? product.category_id : 1,
      description: product ? product.description : '',
      productImg: null,
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const formData = objectToFormData(values);
      console.log('formData:', Object.fromEntries(formData.entries()));

      if (product?.id) {
        await privateApi.put('/api/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await privateApi.post('/api/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      resetForm();
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue(event.target.name, event.target.files[0]);
  };

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="file-upload-form"
      style={{ width: '50%', margin: 'auto', marginTop: '50px' }}
    >
      <Form.Group>
        <Form.Label>Product Title:</Form.Label>
        <Form.Control
          type="text"
          id="title"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price:</Form.Label>
        <Form.Control
          type="number"
          id="price"
          name="price"
          onChange={formik.handleChange}
          value={formik.values.price}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Category:</Form.Label>
        <Form.Control
          as="select"
          id="categoryId"
          name="categoryId"
          onChange={formik.handleChange}
          value={formik.values.categoryId}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image:</Form.Label>
        <input
          type="file"
          id="file"
          name="productImg"
          accept="image/jpeg"
          label="Image"
          onChange={handleFileChange}
        />
      </Form.Group>
      <Button type="submit">Add</Button>
    </Form>
  );
}

import privatePostApi from '../api/privatePostApi';
import { useFormik } from 'formik';
import { useState } from 'react';
import useCategories from '../hooks/useCategories';

export default function AdminProductsForm(props) {
  const [image, setImage] = useState(null);
  const { categories } = useCategories();
  const formik = useFormik({
    initialValues: {
      title: props.product ? props.product.title : '',
      price: props.product ? props.product.price : null,
      categoryId: props.product ? props.product.category_id : 1,
      description: props.product ? props.product.description : '',
      file: null,
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('title', values.title);
      formData.append('price', values.price);
      formData.append('description', values.description);
      formData.append('categoryId', values.categoryId);

      if (props.product) {
        formData.append('productId', props.product.id);
      }

      await privatePostApi.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      resetForm();
    },
  });

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <p>
        Termék neve:
        <input
          type="text"
          id="title"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
      </p>
      <p>
        Termék ára:
        <input
          type="number"
          id="price"
          name="price"
          onChange={formik.handleChange}
          value={formik.values.price}
        />
      </p>
      <p>
        Termék kategória:
        <select
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
        </select>
      </p>
      <p>
        Termék leírása:
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
      </p>
      <p>
        Image: <input type="file" id="file" name="file" onChange={handleImageChange} />
      </p>
      <button type="submit">Küldés</button>
    </form>
  );
}

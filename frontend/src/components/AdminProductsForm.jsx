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
        Image:{' '}
        <input
          type="file"
          id="file"
          name="productImg"
          accept="image/jpeg"
          onChange={handleFileChange}
        />
      </p>
      <button type="submit">Küldés</button>
    </form>
  );
}

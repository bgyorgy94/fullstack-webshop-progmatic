import { useFormik } from 'formik';
import useProducts from '../../hooks/useProducts';
import './Filter.css';

export default function Filter() {
  const { filter, reset } = useProducts();

  const formik = useFormik({
    initialValues: {
      title: '',
      minPrice: '',
      maxPrice: '',
    },
    onSubmit: (values) => {
      filter(values.title, values.minPrice, values.maxPrice);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          id="title"
          name="title"
          placeholder="Name"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
      </div>
      <div className="input-group">
        <input
          className="form-control"
          type="number"
          id="minPrice"
          name="minPrice"
          placeholder="Minimum price"
          onChange={formik.handleChange}
          value={formik.values.minPrice}
        />
      </div>
      <div className="input-group">
        <input
          className="form-control"
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="Maximum price"
          onChange={formik.handleChange}
          value={formik.values.maxPrice}
        />
      </div>
      <button type="submit">Apply</button>
      <button
        type="button"
        onClick={() => {
          reset();
          formik.handleReset();
        }}
      >
        Delete filters
      </button>
    </form>
  );
}

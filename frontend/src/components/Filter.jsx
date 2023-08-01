import { useFormik } from 'formik';
import useProducts from '../hooks/useProducts';

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
    <div className="card mx-auto my-4 p-4" style={{ maxWidth: '400px' }}>
      <form onSubmit={formik.handleSubmit}>
        <p>
          Név:{' '}
          <input
            type="text"
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </p>
        <p>
          Minimum ár:{' '}
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            onChange={formik.handleChange}
            value={formik.values.minPrice}
          />
        </p>
        <p>
          Maximum ár:{' '}
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            onChange={formik.handleChange}
            value={formik.values.maxPrice}
          />
        </p>
        <button type="submit">Szűrés</button>
        <button type="button" onClick={reset}>
          Szűrők törlése
        </button>
      </form>
    </div>
  );
}

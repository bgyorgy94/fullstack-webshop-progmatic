import { useFormik } from 'formik';
import useProducts from '../hooks/useProducts';

export default function Filter() {

    const { filter, reset } = useProducts();

    const formik = useFormik({
        initialValues: {
            title: '',
            minPrice: '',
            maxPrice: ''
        },
        onSubmit: (values) => {
            filter(values.title, values.minPrice, values.maxPrice);
        }
    });

    return (
        <form>
            <p>Név: <input type='text' id='title' name='title' onChange={formik.handleChange} value={formik.values.title} /></p>
            <p>Minimum ár: <input type='number' id='minPrice' name='minPrice' onChange={formik.handleChange} value={formik.values.minPrice} /></p>
            <p>Maximum ár: <input type='number' id='maxPrice' name='maxPrice' onChange={formik.handleChange} value={formik.values.maxPrice} /></p>
            <button type='submit'>Szűrés</button>
            <button onClick={reset}>Reset</button>
        </form>
    )
}
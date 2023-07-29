import useCategories from '../../hooks/useCategories';
import { useFormik } from 'formik';
import productsService from '../../services/products-service';

export default function AddProduct() {

    const {categories} = useCategories();
    const formik = useFormik({
        initialValues: {
            title: '',
            price: null,
            categoryId: null,
            description: ''
        },
        onSubmit: (values, {resetForm}) => {
            productsService.addProduct(values)
            resetForm();
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <p>Termék neve: <input type='text' id='title' name='title' onChange={formik.handleChange} value={formik.values.title}/></p>
            <p>Termék ára: <input type='number' id='price' name='price' onChange={formik.handleChange} value={formik.values.price} /></p>
            <p>Termék kategória: 
                <select id='categoryId' name='categoryId' onChange={formik.handleChange} value={formik.values.categoryId}>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select></p>
            <p>Termék leírása: <textarea id='description' name='description' onChange={formik.handleChange} value={formik.values.description}/></p>
            <button type='submit'>Küldés</button>
        </form>
    )
}
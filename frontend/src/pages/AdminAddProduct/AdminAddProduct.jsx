import useCategories from '../../hooks/useCategories';
import { useFormik } from 'formik';
import productsService from '../../services/products-service';
import AdminProductsForm from '../../components/AdminProductsForm';

export default function AddProduct() {

    return (
        <AdminProductsForm />
    )
}
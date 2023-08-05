import { useEffect, useState } from 'react';
import useCategories from '../../hooks/useCategories';
import { useFormik } from 'formik';
import productsService from '../../services/products-service';
import AdminProductsForm from '../../components/AdminProductsForm';
import { useParams } from 'react-router-dom';

export default function AdminModifyProduct(props) {

    const {id} = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        productsService.getProductById(id)
        .then(resp => setProduct(resp.data))
    }, [])

    return (
        <AdminProductsForm product={product}/>
    )
}
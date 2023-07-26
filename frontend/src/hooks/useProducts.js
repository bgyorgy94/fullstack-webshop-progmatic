import { useState } from 'react';
import productsService from '../services/products-service';

export default function useCategories() {
    const [productList, setProductList] = useState([]);

    function getProducts(sortBy, filter) {
        if(!sortBy && !filter) {
            productsService.getAllProducts()
            .then(resp => setProductList(resp.data.products))
        }
    };

    return {
        productList,
        getProducts
    };

}
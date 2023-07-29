import { useState } from 'react';
import productsService from '../services/products-service';
import { useSearchParams } from "react-router-dom";

export default function useCategories() {
    const [productList, setProductList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    
    
    function getProducts() {
        productsService.getAllProducts(searchParams)
        .then(resp => setProductList(resp.data.products))
    };

    function order(orderBy) {
        let order;
        const searchParamsOrder = searchParams.get('order');
        if (!searchParamsOrder) order = 'ASC'
        else if (searchParamsOrder === 'ASC') order = 'DESC'
        else if (searchParamsOrder === 'DESC') order = 'ASC';

        setSearchParams((prev) => ({...prev, orderBy: orderBy, order: order}))
    };

    return {
        productList,
        getProducts,
        searchParams,
        setSearchParams,
        order
    };

}
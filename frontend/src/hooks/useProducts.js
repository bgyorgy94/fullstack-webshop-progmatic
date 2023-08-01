import { useState } from 'react';
import productsService from '../services/products-service';
import { useSearchParams } from "react-router-dom";

export default function useProducts() {
    const [productList, setProductList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    
    
    function getProducts() {
        productsService.getAllProducts(searchParams)
        .then(resp => {
            setProductList(resp.data)
        })
    };


    function order(orderBy) {
        let order;
        const searchParamsOrder = searchParams.get('order');
        const title = searchParams.get('title') ? searchParams.get('title') : '';
        const minPrice = searchParams.get('minPrice') ? searchParams.get('minPrice') : '' ;
        const maxPrice = searchParams.get('maxPrice') ? searchParams.get('maxPrice') : '';
        if (!searchParamsOrder) order = 'ASC'
        else if (searchParamsOrder === 'ASC') order = 'DESC'
        else if (searchParamsOrder === 'DESC') order = 'ASC';

        setSearchParams({orderBy: orderBy, order: order, title: title, minPrice: minPrice, maxPrice: maxPrice})
    };

    function filter(title, minPrice, maxPrice) {
        setSearchParams({title: title, minPrice: minPrice, maxPrice: maxPrice})
    };

    function reset() {
        setSearchParams();
    };

    return {
        productList,
        getProducts,
        searchParams,
        setSearchParams,
        order,
        filter,
        reset
    };

}
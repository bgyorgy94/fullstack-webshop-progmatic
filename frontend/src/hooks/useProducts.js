import { useState } from 'react';
import productsService from '../services/products-service';
import { useSearchParams } from 'react-router-dom';

export default function useProducts() {
  const [productList, setProductList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({
    orderBy: 'title',
    order: 'ASC',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function getProducts() {
    productsService.getAllProducts({ searchParams, page: currentPage }).then((resp) => {
      setProductList(resp.data.products);
      setTotalPages(resp.data.totalPages);
    });
  }

  function order(orderBy) {
    let order;
    const searchParamsOrder = searchParams.get('order');
    const title = searchParams.get('title') ? searchParams.get('title') : '';
    const minPrice = searchParams.get('minPrice') ? searchParams.get('minPrice') : '';
    const maxPrice = searchParams.get('maxPrice') ? searchParams.get('maxPrice') : '';
    if (!searchParamsOrder) order = 'ASC';
    else if (searchParamsOrder === 'ASC') order = 'DESC';
    else if (searchParamsOrder === 'DESC') order = 'ASC';

    setSearchParams({
      orderBy: orderBy,
      order: order,
      title: title,
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  }

  function setPage(page) {
    setCurrentPage(page);
  }

  function filter(title, minPrice, maxPrice) {
    setSearchParams({ title: title, minPrice: minPrice, maxPrice: maxPrice });
  }

  function reset() {
    setSearchParams();
  }

  return {
    productList,
    searchParams,
    currentPage,
    totalPages,
    getProducts,
    setSearchParams,
    order,
    filter,
    reset,
    setPage,
  };
}

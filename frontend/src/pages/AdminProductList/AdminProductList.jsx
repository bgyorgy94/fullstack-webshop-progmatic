import { useEffect, useState } from 'react';
import useProducts from '../../hooks/useProducts';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import productsService from '../../services/products-service';
import Filter from '../../components/Filter/Filter';

export default function AdminProductList() {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);

  const { productList, getProducts, searchParams, order, currentPage, setPage, totalPages } =
    useProducts();

  useEffect(() => {
    getProducts();
    setUpdate(false);
  }, [searchParams, update, currentPage]);

  return (
    <>
      <div className="card mx-auto my-4 p-4" style={{ maxWidth: '400px', maxHeight: '220px' }}>
        <Filter />
      </div>
      <Table responsive className="w-70 mx-auto">
        <thead className="font-weight-bold text-large border-bottom">
          <tr>
            <th onClick={() => order('title')}>
              Name
              <span className="sort-arrow" />
              {searchParams.get('orderBy') === 'title'
                ? searchParams.get('order') === 'ASC'
                  ? '↑'
                  : '↓'
                : '\u00A0'}
            </th>
            <th onClick={() => order('price')}>
              Price
              <span className="sort-arrow" />
              {searchParams.get('orderBy') === 'price'
                ? searchParams.get('order') === 'ASC'
                  ? '↑'
                  : '↓'
                : '\u00A0'}
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td className="px-1">
                <button onClick={() => navigate(`${product.id}/modify`)}>Edit</button>
              </td>
              <td className="px-1">
                <button
                  onClick={() => {
                    productsService.deleteProduct(product.id);
                    setUpdate(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center mt-3">
        <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}

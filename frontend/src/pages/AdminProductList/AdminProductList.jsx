import { useEffect, useState } from 'react';
import useProducts from '../../hooks/useProducts';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import productsService from '../../services/products-service';
import Filter from '../../components/Filter';

export default function AdminProductList() {

    const navigate = useNavigate();
    const [update, setUpdate] = useState(false);

    const {
        productList,
        getProducts,
        searchParams,
        order
    } = useProducts();

    useEffect(() => {
        getProducts();
        setUpdate(false);
    }, [searchParams, update]);

        return (
            <>
                <Filter />
                <Table responsive>
                    <thead>
                        <tr>
                            <th onClick={() => order('title')}>Termék neve</th>
                            <th onClick={() => order('price')}>Termék ára</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map((product) => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td><button onClick={() => navigate(`${product.id}/modify`)}>Módosítás</button></td>
                                <td><button onClick={() => {
                                    productsService.deleteProduct(product.id);
                                    setUpdate(true);
                                }}>Törlés</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        )
    }
import { useEffect } from 'react';
import useProducts from '../../hooks/useProducts';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

export default function AdminProductList() {

    const navigate = useNavigate();

    const {
        productList,
        getProducts,
        searchParams,
        order
    } = useProducts();

    useEffect(() => {
        getProducts();
    }, [searchParams]);

        return (
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
                                <td><button>Törlés</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        )
    }
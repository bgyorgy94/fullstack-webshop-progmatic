import { useEffect } from 'react';
import useProducts from '../../hooks/useProducts';
import Table from 'react-bootstrap/Table';

export default function AdminProductList() {

    const {
        productList,
        getProducts,
        searchParams,
        setSearchParams,
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
                        <td><button>Módosítás</button></td>
                        <td><button>Törlés</button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export default function Cart() {
    const [cart, setCart] = useContext(CartContext);

    return (
        <>
            <tbody>
                {cart.items.map((product) => {
                    return (
                        <tr key={product.id}>
                            <td><img src='https://placehold.co/100'/></td>
                            <td>{product.title}</td>
                            <td>{product.price} Ft</td>
                            <td><button>-</button>{product.quantity}<button>+</button></td>
                            <td>{product.subtotal} Ft</td>
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td>Összesen:</td>
                    <td></td>
                    <td></td>
                    <td>{cart.total} Ft</td>
                </tr>
            </tfoot>
        </>
    )
}
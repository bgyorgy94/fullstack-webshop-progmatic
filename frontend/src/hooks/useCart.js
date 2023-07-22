import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import cartService from '../services/cart-service';

export default function useCart() {
    const [cart, setCart] = useContext(CartContext);

    let cartItems = [...cart.items];
    let cartTotal = cart.total;

    function increase(productId) {
        cartService.addToCart(productId);
        let index = cartItems.findIndex((item) => item.id === productId);
        cartItems[index].quantity++;
        cartItems[index].subtotal = cartItems[index].quantity * cartItems[index].price;
        cartTotal = cartTotal + cartItems[index].price;

        setCart({...cart, items: cartItems, total: cartTotal});
    };

    function decrease(productId) {
        cartService.removeFromCart(productId);
        let index = cartItems.findIndex((item) => item.id === productId);
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            cartItems[index].subtotal = cartItems[index].quantity * cartItems[index].price;
            cartTotal = cartTotal - cartItems[index].price;
        } else {
            cartTotal = cartTotal - cartItems[index].price;
            delete cartItems[index];
        };

        setCart({...cart, items: cartItems, total: cartTotal});
    };

    function emptyCart() {
        cartService.emptyCart();
        setCart({
            "items": [],
            "total": 0
        });
    };

    return {increase, decrease, emptyCart};
}
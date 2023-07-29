import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import cartService from '../services/cart-service';

export default function useCart() {
  const [cart, setCart] = useContext(CartContext);

  const cartItems = [...cart.items];
  let cartTotal = cart.total;

  function increase(productId) {
    cartService.addToCart(productId);
    const index = cartItems.findIndex((item) => item.id === productId);
    cartItems[index].quantity++;
    cartItems[index].subtotal = cartItems[index].quantity * cartItems[index].price;
    cartTotal += cartItems[index].price;

    setCart({ ...cart, items: cartItems, total: cartTotal });
  }

  function decrease(productId) {
    cartService.removeFromCart(productId);
    const index = cartItems.findIndex((item) => item.id === productId);
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity--;
      cartItems[index].subtotal = cartItems[index].quantity * cartItems[index].price;
      cartTotal -= cartItems[index].price;
    } else {
      cartTotal -= cartItems[index].price;
      delete cartItems[index];
    }

    setCart({ ...cart, items: cartItems, total: cartTotal });
  }

  function remove(productId) {
    cartService.instantRemoveFromCart(productId);
    const index = cartItems.findIndex((item) => item.id === productId);
    cartTotal -= cartItems[index].price * cartItems[index].quantity;
    delete cartItems[index];

    setCart({ ...cart, items: cartItems, total: cartTotal });
  }

  function emptyCart() {
    cartService.emptyCart();
    setCart({
      items: [],
      total: 0,
    });
  }

  return { increase, decrease, emptyCart, remove };
}

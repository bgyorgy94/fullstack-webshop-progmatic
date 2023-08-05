import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import cartService from '../services/cart-service';

export default function useCart() {
  const [cart, setCart] = useContext(CartContext);

  const cartItems = cart.cart;
  let cartTotal = cart.total;

  function increase(product) {
    const index = cartItems.products.findIndex((item) => item.id === product.id);
    cartService.addToCart(product.id);

    if (index === -1) {
      const newProduct = {...product, quantity: 1}
      cartItems.products.push(newProduct);
      cartTotal += product.price;
    } else {
      cartItems.products[index].quantity++;
      cartTotal += cartItems.products[index].price;
    }

    setCart({...cart, cart: cartItems, total: cartTotal})
  }

  function decrease(productId) {
    cartService.removeFromCart(productId);
    const index = cartItems.products.findIndex((item) => item.id === productId);
    if (cartItems.products[index].quantity > 1) {
      cartItems.products[index].quantity--;
      cartTotal -= cartItems.products[index].price;
    } else {
      cartTotal -= cartItems.products[index].price;
      delete cartItems.products[index];
    }

    setCart({ ...cart, cart: cartItems, total: cartTotal });
  }

  function remove(productId) {
    cartService.instantRemoveFromCart(productId);
    const index = cartItems.products.findIndex((item) => item.id === productId);
    cartTotal -= cartItems.products[index].price * cartItems.products[index].quantity;
    delete cartItems.products[index];

    setCart({ ...cart, cart: cartItems, total: cartTotal });
  }

  function emptyCart() {
    cartService.emptyCart();
    setCart({
      cart: {
        products: []
      },
      total: 0,
    });
  }

  return { increase, decrease, emptyCart, remove };
}

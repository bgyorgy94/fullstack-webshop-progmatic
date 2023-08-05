import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import cartService from '../services/cart-service';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({
    cart: {
      products: []
    },
    total: 0,
  });
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (user.token) {
      cartService.getCart().then((resp) => {
        if (resp.data.cart === null) {
          return;
        } else {
          setCart((prev) => ({ ...prev, ...resp.data }))
        }
      });
    }
  }, [user.token]);

  return <CartContext.Provider value={[cart, setCart]}>{children}</CartContext.Provider>;
}

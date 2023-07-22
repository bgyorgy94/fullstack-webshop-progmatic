import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import cartService from '../services/cart-service';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({
        "items": [],
        "total": 0
    });
    const [user] = useContext(UserContext);

    useEffect(() => {
        if (user.token) {
            cartService.getCart()
            .then(resp => setCart((prev) => ({...prev, ...resp.data})))
        };
    }, [user.token]);

    return <CartContext.Provider value={[cart, setCart]}>{children}</CartContext.Provider>
}
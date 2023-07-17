import { useContext, useEffect, useState } from 'react';
import privateApi from '../api/privateApi';
import { UserContext } from '../contexts/UserContext';

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [user] = useContext(UserContext);

  const fetchUserOrders = async () => {
    try {
      const response = await privateApi.get(`/orders`);
      console.log('Orders response:', response);
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [user]);

  const createOrder = async (order) => {
    try {
      const response = await privateApi.post(`/orders`, order);
      console.log('Order response:', response);
      setOrders([...orders, response.data.order]);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return {
    orders,
  };
}

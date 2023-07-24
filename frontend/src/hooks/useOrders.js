import { useContext, useEffect, useState } from 'react';
import privateApi from '../api/privateApi';
import { UserContext } from '../contexts/UserContext';

export default function useOrders(orderId) {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});
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

  const fetchUserOrder = async () => {
    try {
      const response = await privateApi.get(`/orders/${orderId}`);
      console.log('Order response:', response);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchUserOrder(orderId);
      console.log(user);
      console.log(orders);
    } else {
      fetchUserOrders();
      console.log(user);
      console.log(orders);
    }
  }, [orderId]);

  // createOrder
  // deleteOrder

  return {
    order,
    orders,
    orderId,
  };
}

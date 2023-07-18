import { useContext, useEffect, useState } from 'react';
import privateApi from '../api/privateApi';
import { UserContext } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [user] = useContext(UserContext);
  const { orderId } = useParams();

  const fetchUserOrders = async () => {
    try {
      const response = await privateApi.post(`/orders`, { id: user.id });
      console.log('Orders response:', response);
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchUserOrder = async () => {
    try {
      const response = await privateApi.post(`/orders/${orderId}`, { id: user.id });
      console.log('Order response:', response);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchUserOrder(orderId);
    } else {
      fetchUserOrders();
    }
  }, [user, orderId]);

  // createOrder
  // deleteOrder

  return {
    orders,
    orderId,
  };
}

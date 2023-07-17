import { useEffect, useState } from 'react';
import useUserOrders from '../hooks/useUserOrders';

export default function UserOrders() {
  const { orders } = useUserOrders();

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
        </div>
      ))}
    </div>
  );
}

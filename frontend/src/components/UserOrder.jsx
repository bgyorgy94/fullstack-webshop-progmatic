import { useEffect } from 'react';
import useOrders from '../hooks/useOrders';

export default function UserOrder() {
  const { orders } = useOrders();
  // itt az orders elmeletileg mindig csak 1 termeket tartalmaz (az orderId alapjan)

  return (
    <div>
      <h2>Your Order</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Order title: {order.title}</p>
          <p>Order price: {order.price}</p>
        </div>
      ))}
    </div>
  );
}

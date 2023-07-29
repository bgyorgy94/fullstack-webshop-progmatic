import { useParams } from 'react-router-dom';
import useOrders from '../hooks/useOrders';

export default function UserOrder() {
  const { orderId } = useParams();
  const { order } = useOrders(orderId);
  // itt az orders elmeletileg mindig csak 1 termeket tartalmaz (az orderId alapjan)

  return (
    <div>
      <h2>Your Order</h2>
      <div key={order.id}>
        <p>Order ID: {order.id}</p>
        <p>Order date: {order.created_at}</p>
        {order.products?.map?.((product) => (
          <div key={product.id}>
            <p>Product ID: {product.id}</p>
            <p>Product title: {product.title}</p>
            <p>Product price: {product.price}</p>
            <p>Product quantity: {product.quantity}</p>
            <p>Product subtotal: {product.subtotal}</p>
          </div>
        ))}
        <p>Order total price: {order.total}</p>
      </div>
    </div>
  );
}

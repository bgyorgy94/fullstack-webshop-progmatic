import useOrders from '../hooks/useOrders';

export default function UserOrders() {
  const { orders } = useOrders();

  return (
    <div>
      <h2>Your Orders</h2>
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

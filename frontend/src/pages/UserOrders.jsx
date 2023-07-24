import useOrders from '../hooks/useOrders';

export default function UserOrders() {
  const { orders } = useOrders();

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Order date: {order.created_at}</p>
          <p>Order total price: {order.total}</p>
        </div>
      ))}
    </div>
  );
}

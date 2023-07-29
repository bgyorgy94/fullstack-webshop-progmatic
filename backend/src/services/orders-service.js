import { Orders, Categories, Carts, Products } from '../database/connection';
import HttpError from '../utils/httpError';

export default {
  async getAll(userId) {
    const orders = await Orders.findAll({
      where: { userId },
      attributes: { exclude: ['UserId'] },
      include: {
        model: Products,
        as: 'products',
        attributes: ['id', 'title'],
        through: { attributes: ['quantity', 'price'] },
        include: {
          model: Categories,
          as: 'categories',
          attributes: ['id', 'name'],
        },
      },
    });

    return orders.map((order) => {
      const orderProducts = order.toJSON().products;
      const total = orderProducts.reduce((sum, item) => sum + item.OrderProducts.price, 0);

      return {
        ...order.toJSON(),
        products: orderProducts.map((product) => {
          const { OrderProducts, ...otherProductProps } = product;
          return {
            ...otherProductProps,
            quantity: OrderProducts.quantity,
            price: OrderProducts.price,
          };
        }),
        total,
      };
    });
  },

  async get(orderId, userId) {
    const order = await Orders.findOne({
      where: userId ? { id: orderId, userId } : { id: orderId },
      attributes: { exclude: ['UserId'] },
      include: {
        model: Products,
        as: 'products',
        attributes: ['id', 'title'],
        through: { attributes: ['quantity', 'price'] },
        include: {
          model: Categories,
          as: 'categories',
          attributes: ['id', 'name'],
        },
      },
    });

    console.log(userId);

    if (!order) throw new HttpError('Order not found', 404);

    const orderProducts = order.toJSON().products;
    const total = orderProducts.reduce((sum, item) => sum + item.OrderProducts.price, 0);

    return {
      ...order.toJSON(),
      products: orderProducts.map((product) => {
        const { OrderProducts, ...otherProductProps } = product;
        return {
          ...otherProductProps,
          quantity: OrderProducts.quantity,
          price: OrderProducts.price,
        };
      }),
      total,
    };
  },

  async create(userId) {
    console.log(userId);
    const newOrder = await Orders.create({ userId });

    const cartProducts = await Carts.findOne({
      where: { userId },
      attributes: ['id'],
      include: {
        model: Products,
        as: 'products',
      },
    });

    const products = cartProducts.toJSON().products;

    if (!products || products?.length === 0) throw new HttpError('Cart is empty', 400);

    await Promise.all(
      products.map((product) =>
        newOrder.addProduct(product.id, {
          through: { quantity: product.CartProducts.quantity, price: product.price },
        }),
      ),
    );

    await Carts.destroy({ where: { id: cartProducts.id } });

    return newOrder.toJSON();
  },

  async delete(orderId) {
    const deletedOrder = await Orders.destroy({
      where: { id: orderId },
    });

    return deletedOrder;
  },
};

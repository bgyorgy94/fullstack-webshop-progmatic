import { Order, OrderProduct, Cart, Product } from '../database/models';
import sequelize from 'sequelize';

export default {
  async findAll(userId) {
    const orders = await Order.findAll({ where: { userId } });

    return orders.map((order) => order.toJSON());
  },

  async find(userId, orderId) {
    const order = await Order.findOne({ where: { userId, id: orderId } });

    return order ? order.toJSON() : null;
  },

  async getAllOrdersInfo(userId) {
    const orderInfo = await Order.findAll({
      where: { userId },
      attributes: [
        'id',
        'createdAt',
        [
          sequelize.fn('SUM', sequelize.col('OrderProducts.price * OrderProducts.quantity')),
          'total',
        ],
      ],
      group: ['Order.id'],
      include: { model: OrderProduct, attributes: [] },
    });

    return orderInfo.map((order) => order.toJSON());
  },

  async getOrderDetails(orderId, userId) {
    const orderInfo = await Order.findOne({
      where: { id: orderId, userId },
      attributes: [
        'id',
        'createdAt',
        [
          sequelize.fn('SUM', sequelize.col('OrderProducts.price * OrderProducts.quantity')),
          'total',
        ],
      ],
      group: ['Order.id'],
      include: { model: OrderProduct, attributes: [] },
    });

    const orderDetails = await OrderProduct.findAll({
      where: { orderId },
      include: { model: Product, attributes: ['id', 'title'] },
      attributes: ['quantity', 'price', [sequelize.literal('quantity * price'), 'subtotal']],
    });

    return {
      ...orderInfo.toJSON(),
      products: orderDetails.map((detail) => detail.toJSON()),
    };
  },

  async create(userId) {
    const newOrder = await Order.create({ userId });

    const cartItems = await Cart.findAll({ where: { userId } });

    await Promise.all(
      cartItems.map((item) =>
        OrderProduct.create({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }),
      ),
    );

    await Cart.destroy({ where: { userId } });

    return newOrder.toJSON();
  },

  async delete(userId, orderId) {
    const deletedOrder = await Order.destroy({
      where: { id: orderId, userId },
    });

    return deletedOrder;
  },
};

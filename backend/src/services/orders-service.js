import { Orders } from '../database/connection';
import { OrderProducts } from '../database/connection';
import { Carts } from '../database/connection';
import { Products } from '../database/connection';
import sequelize from 'sequelize';

export default {
  async findAll(userId) {
    const orders = await Orders.findAll({ where: { userId } });

    return orders.map((order) => order.toJSON());
  },

  async find(userId, orderId) {
    const order = await Orders.findOne({ where: { userId, id: orderId } });

    return order ? order.toJSON() : null;
  },

  async getAllOrdersInfo(userId) {
    const orderInfo = await Orders.findAll({
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
      include: { model: OrderProducts, attributes: [] },
    });

    return orderInfo.map((order) => order.toJSON());
  },

  async getOrderDetails(orderId, userId) {
    const orderInfo = await Orders.findOne({
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
      include: { model: OrderProducts, attributes: [] },
    });

    const orderDetails = await OrderProducts.findAll({
      where: { orderId },
      include: { model: Products, attributes: ['id', 'title'] },
      attributes: ['quantity', 'price', [sequelize.literal('quantity * price'), 'subtotal']],
    });

    return {
      ...orderInfo.toJSON(),
      products: orderDetails.map((detail) => detail.toJSON()),
    };
  },

  async create(userId) {
    const newOrder = await Orders.create({ userId });

    const cartItems = await Carts.findAll({ where: { userId } });

    await Promise.all(
      cartItems.map((item) =>
        OrderProducts.create({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }),
      ),
    );

    await Carts.destroy({ where: { userId } });

    return newOrder.toJSON();
  },

  async delete(userId, orderId) {
    const deletedOrder = await Orders.destroy({
      where: { id: orderId, userId },
    });

    return deletedOrder;
  },
};

import ordersModel from '../database/models/orders-model';
import cartService from './cart-service';

export default {
  // NOT IN USE
  async findAll(userId) {
    const orders = await ordersModel.getAll(userId);
    return orders;
  },
  // NOT IN USE
  async find(userId, orderId) {
    const order = await ordersModel.getById(userId, orderId);
    return order;
  },

  async getAllOrdersInfo(userId) {
    const orderInfo = await ordersModel.getAllOrdersInfo(userId);
    return orderInfo;
  },

  async getOrderDetails(orderId, userId) {
    let orderDetails;
    let orderInfo;
    if (userId) {
      orderDetails = await ordersModel.getAllOrderDetailsByUserId({ orderId, userId });
      orderInfo = await ordersModel.getOrderInfoByUserId(userId, orderId);
    } else {
      orderDetails = await ordersModel.getAllOrderDetails({ orderId });
      orderInfo = await ordersModel.getOrderInfo(orderId);
    }

    return {
      ...orderInfo,
      products: orderDetails,
    };
  },

  async getOrderDetailsByUserId(userId, orderId) {
    const orderInfo = await ordersModel.getAllOrdersInfo({ userId });
    const orderDetails = await ordersModel.getAllOrderDetails({ orderId });

    return {
      info: orderInfo,
      details: orderDetails,
    };
  },

  async create({ userId }) {
    const newOrder = await ordersModel.create(userId);
    console.log('userid:', userId);
    const cart = await cartService.getAll(userId);
    console.log('cart:', cart);
    await Promise.all(
      cart.map((item) =>
        ordersModel.createOrderProduct(newOrder.orderId, item.id, item.quantity, item.price),
      ),
    );
    await cartService.deleteAll(userId);
    return newOrder;
  },

  async delete(userId, orderId) {
    const deletedOrder = await ordersModel.delete(userId, orderId);
    return deletedOrder;
  },
};

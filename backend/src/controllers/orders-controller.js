import ordersService from '../services/orders-service';
import cartsService from '../services/carts-service';

export default {
  async findAll(req, res, next) {
    const userId = req.user.id;

    try {
      const orders = await ordersService.getAllOrdersInfo(userId);
      res.send({ orders });
      console.log('orders:', orders);
    } catch (err) {
      next(err);
    }
  },

  // NOT IN USE
  async find(req, res, next) {
    const userId = req.user.id;
    const { orderId } = req.params;

    try {
      const order = await ordersService.find({ userId, orderId });
      res.send(order);
    } catch (err) {
      next(err);
    }
  },
  async create(req, res, next) {
    const userId = req.user.id;
    try {
      const order = await ordersService.create({ userId });
      console.log(order);
      await cartService.deleteAll({ userId });
      res.status(201).send(order);
    } catch (err) {
      next(err);
    }
  },
  async delete(req, res, next) {
    const userId = req.user.id;
    const { orderId } = req.params;
    try {
      const order = await ordersService.delete({ userId, orderId });
      res.status(200).send(order);
    } catch (err) {
      next(err);
    }
  },

  async getOrderDetails(req, res, next) {
    const userId = req.user.isAdmin ? null : req.user.id;
    const { orderId } = req.params;

    try {
      const orderDetails = await ordersService.getOrderDetails(orderId, userId);
      res.send(orderDetails);
    } catch (err) {
      next(err);
    }
  },
};

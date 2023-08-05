import ordersService from '../services/orders-service';

export default {
  async findAll(req, res, next) {
    const userId = req.user.id;
    const { limit, offset, productName } = req.query;

    try {
      const orders = await ordersService.getAll(userId, limit, offset, productName);
      res.send({ orders });
      console.log('orders:', orders);
    } catch (err) {
      next(err);
    }
  },

  async find(req, res, next) {
    const userId = req.user.isAdmin ? null : req.user.id;
    const { orderId } = req.params;

    try {
      const orderDetails = await ordersService.get(orderId, userId);
      res.send(orderDetails);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    const userId = req.user.id;
    try {
      const order = await ordersService.create(userId);
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
};

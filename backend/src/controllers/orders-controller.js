import ordersService from '../services/orders-service';

export default {
  async findAll(req, res, next) {
    const { userId } = req.params;
    try {
      const orders = await ordersService.findAll(userId);
      res.send({ orders });
    } catch (err) {
      next(err);
    }
  },
  async find(req, res, next) {
    const { userId, orderId } = req.params;
    try {
      const order = await ordersService.find(userId, orderId);
      res.send(order);
    } catch (err) {
      next(err);
    }
  },
  async create(req, res, next) {
    const { userId } = req.params;
    try {
      const order = await ordersService.create(userId);
      res.status(201).send(order);
    } catch (err) {
      next(err);
    }
  },
  async delete(req, res, next) {
    const { userId, orderId } = req.params;
    try {
      const order = await ordersService.delete(userId, orderId);
      res.status(200).send(order);
    } catch (err) {
      next(err);
    }
  },
};

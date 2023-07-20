import userOrdersService from '../services/user-orders-service';
import cartService from '../services/cart-service';

export default {
  async findAll(req, res, next) {
    const { id } = req.body;

    try {
      const orders = await userOrdersService.findAll({ userId: id });
      res.send({ orders });
    } catch (err) {
      next(err);
    }
  },
  async find(req, res, next) {
    const { id } = req.body;
    const { orderId } = req.params;

    try {
      const order = await userOrdersService.find({ userId: id, orderId });
      res.send(order);
    } catch (err) {
      next(err);
    }
  },
  async create(req, res, next) {
    const { id } = req.body;
    try {
      const order = await userOrdersService.create({ userId: id });
      await cartService.deleteAll({ userId: id });
      res.status(201).send(order);
    } catch (err) {
      next(err);
    }
  },
  async delete(req, res, next) {
    const { id } = req.body;
    const { orderId } = req.params;
    try {
      const order = await userOrdersService.delete({ userId: id, orderId });
      res.status(200).send(order);
    } catch (err) {
      next(err);
    }
  },
};

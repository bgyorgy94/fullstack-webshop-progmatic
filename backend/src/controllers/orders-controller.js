import ordersService from '../services/orders-service';

export default {
  async findAll(req, res, next) {
    const { userId } = req.params;
    try {
      const orders = await ordersService.findAll(userId);
      res.send(orders);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    const { productId } = req.body;
    const { userId } = req.params;
    try {
      const order = await ordersService.create(productId, userId);
      res.status(201).send(order);
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    const { productId } = req.body;
    const { userId } = req.params;
    try {
      const order = await ordersService.delete(productId, userId);
      res.status(200).send(order);
    } catch (error) {
      next(error);
    }
  },
};

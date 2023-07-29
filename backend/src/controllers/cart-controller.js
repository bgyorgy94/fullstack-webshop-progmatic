import cartsService from '../services/carts-service';

export default {
  async add(req, res, next) {
    const { productId } = req.body;
    const userId = req.user.id;
    try {
      const addedProduct = await cartsService.create({ productId, userId });
      res.send(addedProduct);
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    const userId = req.user.id;
    try {
      const cartItems = await cartsService.getAll(userId);
      res.send({
        items: cartItems,
        total: cartItems.map((item) => item.subtotal).reduce((acc, curr) => acc + curr, 0),
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    const userId = req.user.id;
    const productId = req.params.id;
    try {
      const deletedProduct = await cartsService.delete({ productId, userId });
      res.send(deletedProduct);
    } catch (err) {
      next(err);
    }
  },

  async deleteAll(req, res, next) {
    const userId = req.user.id;
    try {
      const deletedId = await cartsService.deleteAll({ userId });
      res.send(deletedId);
    } catch (error) {
      next(error);
    }
  },
};

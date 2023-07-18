import cartService from '../services/cart-service';

export default {
  async add(req, res, next) {
    const { productId } = req.body;
    const userId = req.user.id;
    try {
      const addedProduct = await cartService.add({ productId, userId });
      res.send(addedProduct);
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    const userId = req.user.id;
    try {
      const cartItems = await cartService.getAll({ userId });
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
      const deletedProduct = await cartService.delete({ productId, userId });
      res.send(deletedProduct);
    } catch (err) {
      next(err);
    }
  },
};

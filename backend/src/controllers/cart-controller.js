import cartsService from '../services/carts-service';

export default {
  async add(req, res, next) {
    const { productId } = req.body;
    const userId = req.user.id;
    try {
      const addedProduct = await cartsService.create(userId, productId);
      res.send(addedProduct);
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    const userId = req.user.id;
    try {
      const cart = await cartsService.getAll(userId);
      res.send(cart);
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

  remove(req, res, next) {
    const userId = req.user.id;
    const productId = req.params.id;
    cartService.remove({ productId, userId }).then((removedItem) => res.send(removedItem));
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

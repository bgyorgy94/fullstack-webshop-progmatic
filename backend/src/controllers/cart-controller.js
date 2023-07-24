import cartService from '../services/cart-service';

export default {
  add(req, res, next) {
    const { productId } = req.body;
    const userId = req.user.id;
    cartService.add({ productId, userId }).then((addedProduct) => res.send(addedProduct));
  },

  getAll(req, res, next) {
    const userId = req.user.id;
    cartService.getAll({ userId }).then((cartItems) => {
      res.send({
        items: cartItems,
        total: cartItems.map((item) => item.subtotal).reduce((acc, curr) => acc + curr, 0),
      });
    });
  },

  delete(req, res, next) {
    const userId = req.user.id;
    const productId = req.params.id;
    cartService.delete({ productId, userId }).then((deletedProduct) => res.send(deletedProduct));
  },

  deleteAll(req, res, next) {
    const userId = req.user.id;
    cartService.deleteAll({ userId }).then((deletedId) => res.send(deletedId));
  },
};

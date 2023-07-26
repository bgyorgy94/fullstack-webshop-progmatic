import { Cart, Product } from '../database/models';

export default {
  async getAll(userId) {
    const cartItems = await Cart.findAll({
      where: { userId },
      include: { model: Product, as: 'product' },
    });
    return cartItems.map((item) => item.toJSON());
  },

  async find(userId, productId) {
    const cartItem = await Cart.findOne({ where: { userId, productId } });
    return cartItem ? cartItem.toJSON() : null;
  },

  async create(userId, productId, quantity) {
    const cartItem = await Cart.create({ userId, productId, quantity });
    return cartItem.toJSON();
  },

  async update(userId, productId, quantity) {
    await Cart.update({ quantity }, { where: { userId, productId } });
    const updatedCartItem = await Cart.findOne({ where: { userId, productId } });
    return updatedCartItem.toJSON();
  },

  async delete(userId, productId) {
    await Cart.destroy({ where: { userId, productId } });
    return { userId, productId };
  },

  async deleteAll(userId) {
    await Cart.destroy({ where: { userId } });
    return { userId };
  },
};

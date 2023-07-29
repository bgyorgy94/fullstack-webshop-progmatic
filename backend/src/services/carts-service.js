import { Carts } from '../database/connection';
import { Products } from '../database/connection';
import { Users } from '../database/connection';

export default {
  async getAll(userId) {
    const userWithCart = await Users.findOne({
      where: { id: userId },
      include: { model: Carts, as: 'carts', include: { model: Products, as: 'products' } },
    });
    return userWithCart && userWithCart.cart ? userWithCart.cart.map((item) => item.toJSON()) : [];
  },

  async find(userId, productId) {
    const cartItem = await Carts.findOne({ where: { userId, productId } });
    return cartItem ? cartItem.toJSON() : null;
  },

  async create(userId, productId, quantity) {
    const cartItem = await Carts.create({ userId, productId, quantity });
    return cartItem.toJSON();
  },

  async update(userId, productId, quantity) {
    await Carts.update({ quantity }, { where: { userId, productId } });
    const updatedCartItem = await Carts.findOne({ where: { userId, productId } });
    return updatedCartItem.toJSON();
  },

  async delete(userId, productId) {
    await Carts.destroy({ where: { userId, productId } });
    return { userId, productId };
  },

  async deleteAll(userId) {
    await Carts.destroy({ where: { userId } });
    return { userId };
  },
};

import { CartProducts, Carts, Products, Users } from '../database/connection';

export default {
  async getAll(userId) {
    const userWithCart = await Users.findOne({
      where: { id: userId },
      include: {
        model: Carts,
        as: 'cart',
        attributes: ['id', 'createdAt', 'updatedAt'],
        include: [
          {
            model: Products,
            as: 'products',
            attributes: ['id', 'title', 'price', 'categoryId'],
            through: { attributes: ['quantity'] },
          },
        ],
      },
    });

    const cart = userWithCart ? userWithCart.toJSON().cart : null;

    if (cart) {
      cart.products = cart.products.map((product) => {
        const { CartProducts: cartProductData, ...otherProductProps } = product;
        return { ...otherProductProps, quantity: cartProductData.quantity };
      });
    }

    const total = cart
      ? cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0)
      : null;

    return { cart, total };
  },

  async find(userId, productId) {
    const cartItem = await Carts.findOne({ where: { userId, productId } });
    return cartItem ? cartItem.toJSON() : null;
  },

  async create(userId, productId) {
    const [cart] = await Carts.findOrCreate({ where: { userId } });

    const [cartItem, created] = await CartProducts.findOrCreate({
      where: { CartId: cart.id, ProductId: productId },
    });

    if (!created) {
      cartItem.quantity += 1;
      await cartItem.save();
    }

    await cart.reload();

    return cart.toJSON();
  },

  async update(userId, productId, quantity) {
    await Carts.update({ quantity }, { where: { userId, productId } });
    const updatedCartItem = await Carts.findOne({ where: { userId, productId } });
    return updatedCartItem.toJSON();
  },

  async updateOrDelete(userId, productId) {
    const cart = await Carts.findOne({ where: { userId }, include: [{
      model: Products, 
      as: 'products',
      where: {id: productId}
    }]});
    if (!cart) {
      return {message: 'Product has been already deleted'}
    }
    cart.products[0].CartProducts.quantity -= 1;
    if (cart.products[0].CartProducts.quantity <= 0) {
      await cart.products[0].CartProducts.destroy()
    }
    await cart.products[0].CartProducts.save()
    return { userId, productId };
  },

  async deleteProduct(userId, productId) {
    await Carts.destroy({ where: { userId }, include: [{
      model: Products, 
      as: 'products',
      where: {id: productId}
    }]});
    return {message: 'Successfully deleted'};
  },

  async deleteAll(userId) {
    await Carts.destroy({ where: { userId } });
    return { userId };
  },
};

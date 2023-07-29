import { Products, Categories } from '../database/connection';

export default {
  async findAll() {
    const products = await Products.findAll({
      attributes: ['id', 'title', 'price', 'description', 'categoryId'],
      include: {
        model: Categories,
        attributes: ['name'],
        as: 'categories',
      },
    });
    return products.map((product) => product.toJSON());
  },

  async find(id) {
    const product = await Products.findByPk(id);
    return product ? product.toJSON() : null;
  },

  async create({ title, price, description, categoryId }) {
    const product = await Products.create({ title, price, description, categoryId });
    return product.toJSON();
  },

  async update(id, title, price, description, categoryId) {
    await Products.update({ title, price, description, categoryId }, { where: { id } });
    const updatedProduct = await Products.findByPk(id);
    return updatedProduct.toJSON();
  },

  async delete(id) {
    await Products.destroy({ where: { id } });
    return { id };
  },
};

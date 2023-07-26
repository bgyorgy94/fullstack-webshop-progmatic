import { Product } from '../database/models';

export default {
  async findAll() {
    const products = await Product.findAll({
      attributes: ['title', 'price', 'description', 'categoryId'],
      include: {
        model: Category,
        attributes: ['name'],
        as: 'category',
      },
    });
    return products.map((product) => product.toJSON());
  },

  async find(id) {
    const product = await Product.findByPk(id);
    return product ? product.toJSON() : null;
  },

  async create({ title, price, description, categoryId }) {
    const product = await Product.create({ title, price, description, categoryId });
    return product.toJSON();
  },

  async update(id, title, price, description, categoryId) {
    await Product.update({ title, price, description, categoryId }, { where: { id } });
    const updatedProduct = await Product.findByPk(id);
    return updatedProduct.toJSON();
  },

  async delete(id) {
    await Product.destroy({ where: { id } });
    return { id };
  },
};

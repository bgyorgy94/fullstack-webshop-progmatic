import { Op } from 'sequelize';
import { Products, Categories } from '../database/connection';

export default {
  async findAll(limit, offset, productName, minPrice, maxPrice, orderBy, order) {
    const whereCondition = {};

    if (productName) {
      whereCondition.title = { [Op.like]: `%${productName}%` };
    }

    if (minPrice && maxPrice) {
      whereCondition.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      whereCondition.price = { [Op.gte]: minPrice };
    } else if (maxPrice) {
      whereCondition.price = { [Op.lte]: maxPrice };
    }

    const orderCondition = [];

    if (orderBy && order) {
      orderCondition.push([orderBy, order]);
    }

    const products = await Products.findAll({
      where: whereCondition,
      limit: parseInt(limit || 10, 10),
      offset: parseInt(offset || 0, 10),
      order: orderCondition,
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

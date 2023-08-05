import { Op } from 'sequelize';
import { Products, Categories } from '../database/connection';

export default {
  async findAll(limit = 9, page = 1, title, minPrice, maxPrice, orderBy, order) {
    const offset = (page - 1) * limit;
    const whereCondition = {};

    if (title) {
      whereCondition.title = { [Op.like]: `%${title}%` };
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
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: orderCondition,
      attributes: ['id', 'title', 'price', 'description', 'categoryId', 'imagePath'],
      include: {
        model: Categories,
        attributes: ['name'],
        as: 'categories',
      },
    });

    const totalCount = await Products.count({ where: whereCondition });
    const totalPages = Math.ceil(totalCount / limit);

    const productsJSON = products.map((product) => product.toJSON());

    return {
      products: productsJSON,
      totalPages,
      totalCount,
      currentPage: page,
    };
  },

  async find(id) {
    const product = await Products.findByPk(id);
    return product ? product.toJSON() : null;
  },

  async create({ title, price, description, categoryId, imagePath }) {
    const product = await Products.create({ title, price, description, categoryId, imagePath });
    return product.toJSON();
  },

  async update({ id, title, price, description, categoryId, imagePath }) {
    await Products.update({ title, price, description, categoryId, imagePath }, { where: { id } });
    const updatedProduct = await Products.findByPk(id);
    return updatedProduct.toJSON();
  },

  async delete(id) {
    await Products.destroy({ where: { id } });
    return { id };
  },
};

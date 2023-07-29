import productsService from '../services/products-service';

export default {
  async findAll(req, res, next) {
    const {orderBy, order, title, minPrice, maxPrice} = req.query;
    try {
      const products = await productsService.findAll({ orderBy, order, title, minPrice, maxPrice });
      res.send(products);
    } catch (error) {
      next(error);
    }
  },

  async find(req, res, next) {
    const { id } = req.params;
    try {
      const product = await productsService.find(id);
      res.send(product);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    const { title, price, description, categoryId } = req.body;
    try {
      const product = await productsService.create({
        title,
        price,
        description,
        categoryId,
      });
      res.status(201).send(product);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    const { id } = req.params;
    const { title, price, description, categoryId } = req.body;
    try {
      const product = await productsService.update({
        id,
        title,
        price,
        description,
        categoryId,
      });
      res.status(201).send(product);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const product = await productsService.delete(id);
      res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  },
};

import productsService from '../services/products-service';
import HttpError from '../utils/httpError';

export default {
  async findAll(req, res, next) {
    const { limit, page, title, minPrice, maxPrice, orderBy, order } = req.query;
    try {
      const products = await productsService.findAll(
        limit,
        page,
        title,
        minPrice,
        maxPrice,
        orderBy,
        order,
      );
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

    if (!req.file?.filename) {
      return next(new HttpError('Image is required', 400));
    }

    const imagePath = `/uploads/${req.file.filename}`;
    console.log(imagePath);
    try {
      const product = await productsService.create({
        title,
        price,
        description,
        categoryId,
        imagePath,
      });
      res.status(201).send(product);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    const id = req.params.id;
    const { title, price, description, categoryId } = req.body;
    const imagePath = req.file?.filename;

    try {
      const product = await productsService.update({
        id,
        title,
        price,
        description,
        categoryId,
        imagePath,
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

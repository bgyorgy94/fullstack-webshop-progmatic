import categoriesService from '../services/categories-service';
import HttpError from '../utils/httpError';

export default {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) throw new HttpError('Missing required parameter', 400);
      const category = await categoriesService.create(name);
      res.status(201).send(category);
    } catch (error) {
      if (error.message.includes('UNIQUE')) {
        next(new HttpError('Category name already exists', 400));
      } else {
        next(error);
      }
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) throw new HttpError('Missing required parameter', 400);
      await categoriesService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name || !id) throw new HttpError('Missing required parameter', 400);
      const category = await categoriesService.update(id, name);
      res.status(201).send(category);
    } catch (error) {
      next(error);
    }
  },
  async findAll(req, res, next) {
    try {
      const categories = await categoriesService.findAll();
      res.send({ categories });
    } catch (error) {
      next(error);
    }
  },
  async findById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) throw new HttpError('Missing required parameter', 400);
      const category = await categoriesService.findById(id);
      res.status(200).send(category);
    } catch (error) {
      next(error);
    }
  },
};

import categoriesService from '../services/categories-service';
import HttpError from '../utils/httpError';

export default {
  async create(req, res, next) {
    const { name } = req.body;
    try {
      const category = await categoriesService.create(name);
      res.status(201).send(category);
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      if (!id) throw new HttpError('Missing required parameter', 400);
      await categoriesService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const category = await categoriesService.update(id, name);
      res.status(201).send(category);
    } catch (error) {
      next(error);
    }
  },
  async findAll(req, res, next) {
    try {
      const categories = await categoriesService.findAll();
      res.send(categories);
    } catch (error) {
      next(error);
    }
  },
  async findById(req, res, next) {
    const { id } = req.params;
    try {
      if (!id) throw new HttpError('Missing required parameter', 400);
      const category = await categoriesService.findById(id);
      res.status(200).send(category);
    } catch (error) {
      next(error);
    }
  },
};

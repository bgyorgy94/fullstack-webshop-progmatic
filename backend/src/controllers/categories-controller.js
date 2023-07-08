import categoriesService from '../services/categories-service';
import HttpError from '../utils/httpError';

export default {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) throw new HttpError('missing required parameter', 400);
      if (name.length < 3 || name.length > 30)
        throw new HttpError('name must be between 3 and 30 characters', 400);
      const category = await categoriesService.create(name);
      res.status(201).send(category);
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) throw new HttpError('missing required parameter', 400);
      await categoriesService.delete(id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name || !id) throw new HttpError('missing required parameter', 400);
      if (name.length < 3 || name.length > 30)
        throw new HttpError('name must be between 3 and 30 characters', 400);
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
      if (!id) throw new HttpError('missing required parameter', 400);
      const category = await categoriesService.findById(id);
      res.status(200).send(category);
    } catch (error) {
      next(error);
    }
  },
};

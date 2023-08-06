import mainCategoriesService from '../services/main-categories-service';

export default {
  async create(req, res, next) {
    const { name } = req.body;
    try {
      const category = await mainCategoriesService.create(name);
      res.status(201).send(category);
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      await mainCategoriesService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const category = await mainCategoriesService.update(id, name);
      res.status(201).send(category);
    } catch (error) {
      next(error);
    }
  },
  async findAll(req, res, next) {
    try {
      const categories = await mainCategoriesService.findAll();
      res.send(categories);
    } catch (error) {
      next(error);
    }
  },
  async findById(req, res, next) {
    const { id } = req.params;
    try {
      const category = await mainCategoriesService.findById(id);
      res.status(200).send(category);
    } catch (error) {
      next(error);
    }
  },
};

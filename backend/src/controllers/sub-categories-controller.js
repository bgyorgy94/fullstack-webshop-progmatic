import subCategoriesService from '../services/sub-categories-service';

export default {
  async create(req, res, next) {
    console.log('Body:', req.body);
    const { name, mainCategoryId } = req.body;

    try {
      const subcategory = await subCategoriesService.create(name, mainCategoryId);
      res.status(201).send(subcategory);
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await subCategoriesService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    const { id } = req.params;
    const { name, mainCategoryId } = req.body;
    try {
      const subcategory = await subCategoriesService.update(id, name, mainCategoryId);
      res.status(201).send(subcategory);
    } catch (error) {
      next(error);
    }
  },
  async findAll(req, res, next) {
    try {
      const subcategories = await subCategoriesService.findAll();
      res.send(subcategories);
    } catch (error) {
      next(error);
    }
  },
  async findById(req, res, next) {
    const { id } = req.params;
    try {
      const subcategory = await subCategoriesService.findById(id);
      res.status(200).send(subcategory);
    } catch (error) {
      next(error);
    }
  },
};

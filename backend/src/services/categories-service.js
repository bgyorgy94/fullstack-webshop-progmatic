import categoriesModel from '../database/models/categories-model';

export default {
  async create(name) {
    try {
      // unique name validation
      const existingCategory = await categoriesModel.getByName(name);
      if (existingCategory) {
        throw new Error('Category name already exists');
      }
      return await categoriesModel.create({ name });
    } catch (error) {
      throw error;
    }
  },
  async delete(id) {
    try {
      await categoriesModel.delete(id);
    } catch (error) {
      throw error;
    }
  },
  async update(id, name) {
    try {
      return await categoriesModel.update(id, name);
    } catch (error) {
      throw error;
    }
  },
  async findAll() {
    try {
      return await categoriesModel.getAll();
    } catch (error) {
      throw error;
    }
  },
  async findById(id) {
    try {
      return await categoriesModel.getById(id);
    } catch (error) {
      throw error;
    }
  },
};

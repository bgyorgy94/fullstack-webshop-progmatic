import categoriesModel from '../database/models/categories-model';

export default {
  create(name) {
    return categoriesModel.create({ name });
  },
  delete(id) {
    return categoriesModel.delete(id);
  },
  update(id, name) {
    return categoriesModel.update(id, name);
  },
  findAll() {
    return categoriesModel.getAll();
  },
  findById(id) {
    return categoriesModel.getById(id);
  },
};

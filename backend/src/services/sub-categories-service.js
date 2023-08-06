import { SubCategories } from '../database/connection';

export default {
  create(name, mainCategoryId) {
    return SubCategories.create({ name, mainCategoryId });
  },
  delete(id) {
    return SubCategories.destroy({ where: { id } });
  },
  update(id, name, mainCategoryId) {
    return SubCategories.update({ name, mainCategoryId }, { where: { id } });
  },
  findAll() {
    return SubCategories.findAll();
  },
  findById(id) {
    return SubCategories.findByPk(id);
  },
};

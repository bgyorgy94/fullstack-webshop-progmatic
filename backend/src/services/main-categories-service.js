import { MainCategories } from '../database/connection';

export default {
  create(name) {
    return MainCategories.create({ name });
  },
  delete(id) {
    return MainCategories.destroy({ where: { id } });
  },
  update(id, name) {
    return MainCategories.update({ name }, { where: { id } });
  },
  findAll() {
    return MainCategories.findAll();
  },
  findById(id) {
    return MainCategories.findByPk(id);
  },
};

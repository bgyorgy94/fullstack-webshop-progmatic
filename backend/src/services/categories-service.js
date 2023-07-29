import { Categories } from '../database/connection.js';

export default {
  create(name) {
    return Categories.create({ name });
  },
  delete(id) {
    return Categories.destroy({ where: { id } });
  },
  update(id, name) {
    return Categories.update({ name }, { where: { id } });
  },
  findAll() {
    return Categories.findAll();
  },
  findById(id) {
    return Categories.findByPk(id);
  },
};

import Category from '../models/categories-model';

export default {
  create(name) {
    return Category.create({ name });
  },
  delete(id) {
    return Category.destroy({ where: { id } });
  },
  update(id, name) {
    return Category.update({ name }, { where: { id } });
  },
  findAll() {
    return Category.findAll();
  },
  findById(id) {
    // findByPk megkeresi a megadott id-vel rendelkezo rekordot
    return Category.findByPk(id);
  },
};

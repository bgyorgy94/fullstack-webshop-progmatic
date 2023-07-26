import { User } from '../database/models';
import nanoid from 'nanoid';

export default {
  async find(id) {
    const user = await User.findByPk(id);
    return user ? user.toJSON() : null;
  },

  async update(id, email, passwordHash, isAdmin) {
    await User.update({ email, passwordHash, isAdmin }, { where: { id } });
    const updatedUser = await User.findByPk(id);
    return updatedUser.toJSON();
  },

  async delete(id) {
    await User.destroy({ where: { id } });
    return { id };
  },

  async getAll() {
    const users = await User.findAll();
    return users.map((user) => user.toJSON());
  },

  async create(email, passwordHash, isAdmin = false) {
    const id = nanoid();
    const user = await User.create({ id, email, passwordHash, isAdmin });
    return user.toJSON();
  },
};

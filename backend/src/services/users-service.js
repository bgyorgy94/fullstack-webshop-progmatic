import Users from '../database/models/users-model';
import nanoid from 'nanoid';

export default {
  async find(id) {
    const user = await Users.findByPk(id);
    return user ? user.toJSON() : null;
  },

  async update(id, email, passwordHash, isAdmin) {
    await Users.update({ email, passwordHash, isAdmin }, { where: { id } });
    const updatedUser = await Users.findByPk(id);
    return updatedUser.toJSON();
  },

  async delete(id) {
    await Users.destroy({ where: { id } });
    return { id };
  },

  async getAll() {
    const users = await Users.findAll();
    return users.map((user) => user.toJSON());
  },

  async create(email, passwordHash, isAdmin = false) {
    const id = nanoid();
    const user = await Users.create({ id, email, passwordHash, isAdmin });
    return user.toJSON();
  },
};

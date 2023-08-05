import nanoid from 'nanoid';
import Users from '../database/connection';

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

  async getAll(limit, offset) {
    const users = await Users.getAll({
      limit: parseInt(limit || 10, 10),
      offset: parseInt(offset || 0, 10),
    });
    return users.map((user) => user.toJSON());
  },

  async create(email, passwordHash, isAdmin = false) {
    const id = nanoid();
    const user = await Users.create({ id, email, passwordHash, isAdmin });
    return user.toJSON();
  },
};

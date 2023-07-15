import usersModel from '../database/models/users-model';

export default {
  getAll() {
    return usersModel.getAll();
  },
};

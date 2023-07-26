import Sequelize from 'sequelize';
import sequelize from '../connection';
import { nanoid } from 'nanoid';

const User = sequelize.define('User', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: () => nanoid(),
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: Sequelize.STRING,
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

export default User;

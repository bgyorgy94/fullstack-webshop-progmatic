import productsModel from './models/products-model';
import categoriesModel from './models/categories-model';
import usersModel from './models/users-model';
import cartModel from './models/cart-model';
import db from './connection';

export default function initDb() {
  db.get('PRAGMA foreign_keys = ON');
  productsModel.createTable();
  categoriesModel.createTable();
  usersModel.createTable();
  cartModel.createTable();
}

import productsModel from './models/products-model';
import db from './connection';

export default function initDb() {
  db.get('PRAGMA foreign_keys = ON');
  productsModel.createTable();
}

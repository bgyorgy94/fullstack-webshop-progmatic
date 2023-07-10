import db from '../connection';

export default {
  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      )
    `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Categories table creation error: ${err.message}`);
        throw err;
      }
    });
  },
  getAll() {
    const sql = 'SELECT * FROM categories';

    return new Promise((resolve, reject) => {
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
  getById(id) {
    const sql = 'SELECT * FROM categories WHERE id = $id';
    const params = { $id: id };

    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
  create({ name }) {
    const sql = 'INSERT INTO categories(name) VALUES($name)';
    const params = { $name: name };

    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ name, id: this.lastID });
        }
      });
    });
  },
  delete(id) {
    const sql = 'DELETE FROM categories WHERE id = $id';
    const params = { $id: id };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  update(id, name) {
    const sql = 'UPDATE categories SET name = $name WHERE id = $id';
    const params = { $name: name, $id: id };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id, name });
        }
      });
    });
  },
};

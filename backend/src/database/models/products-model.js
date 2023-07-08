import db from '../connection';

export default {
  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      title TEXT,
      price INTEGER,
      description TEXT,
      category_id INTEGER,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Products table creation error: ${err.message}`);
        throw err;
      }
    });
  },

  getAll() {
    const sql = 'SELECT * FROM products';
    return new Promise((resolve, reject) => {
      db.all(sql, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  get({ id }) {
    const sql = `SELECT * FROM products WHERE id = $id`;
    const param = { $id: id };

    return new Promise((resolve, reject) => {
      db.get(sql, param, (err, row) => {
        console.log(param, row);
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  create({ title, price, description, categoryId }) {
    const sql =
      'INSERT INTO products(title, price, description, category_id) VALUES($title, $price, $description, $categoryId)';
    const params = {
      $title: title,
      $price: price,
      $description: description,
      $categoryId: categoryId,
    };

    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ title, price, id: this.lastID });
      });
    });
  },

  delete({ id }) {
    const sql = `DELETE FROM products WHERE id = $id`;
    const param = { $id: id };

    return new Promise((resolve, reject) => {
      db.run(sql, param, (err) => {
        if (err) reject(err);
        else resolve({ id });
      });
    });
  },
};

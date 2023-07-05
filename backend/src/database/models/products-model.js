import db from '../connection';

export default {
  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      price INTEGER
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

  create({ price, name }) {
    const sql = 'INSERT INTO products(name, price) VALUES($name, $price)';
    const params = { $price: price, $name: name };

    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ price, name, id: this.lastID });
      });
    });
  },
};

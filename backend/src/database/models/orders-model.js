import db from '../connection';

export default {
  createTable() {
    // ezeket at kell irni hogy a carttal egyutt mukodjon
    const sql = `CREATE TABLE IF NOT EXISTS orders (
            product_id INTEGER,
            user_id TEXT,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`;

    db.run(sql, (err) => {
      if (err) {
        console.log('Orders table creation error:', err.message);
        throw err;
      }
    });
  },

  create({ productId, userId }) {
    const sql = `INSERT INTO orders (product_id, user_id)
            VALUES ($product_id, $user_id)`;

    const params = { $product_id: productId, $user_id: userId };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve({ productId });
      });
    });
  },

  getAll({ userId }) {
    const sql = `SELECT o.id, p.title, p.price, count(*) quantity, sum(p.price) subtotal
            FROM products p
            JOIN orders o
            ON p.id = o.product_id
            WHERE o.user_id = $user_id
            GROUP BY o.id, p.title`;

    const params = { $user_id: userId };

    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  getById({ productId, userId }) {
    const sql = `SELECT p.title, p.price, count(*) quantity, sum(price) subtotal
            FROM products p
            JOIN orders o
            ON p.id = o.product_id
            WHERE o.user_id = $user_id
            AND o.product_id = $product_id
            GROUP BY p.title`;

    const params = { $user_id: userId, $product_id: productId };

    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  delete({ productId, userId }) {
    const sql = `DELETE FROM orders
            WHERE rowid = (
                SELECT MIN(rowid)
                FROM orders
                WHERE user_id = $user_id
                AND product_id = $product_id)`;

    const params = { $user_id: userId, $product_id: productId };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve({ productId });
      });
    });
  },
};

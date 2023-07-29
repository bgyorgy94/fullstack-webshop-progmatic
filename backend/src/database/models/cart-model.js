import db from '../connection';

export default {
  createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS carts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER,
            user_id TEXT,
            quantity INTEGER DEFAULT 1,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
            CHECK(quantity > 0)
        )`;

    db.run(sql, (err) => {
      if (err) {
        console.log('Cart table creation error:', err.message);
        throw err;
      }
    });
  },

  create({ productId, userId, quantity = 1 }) {
    const sql = `INSERT INTO carts (product_id, user_id, quantity)
            VALUES ($product_id, $user_id, $quantity)`;

    const params = { $product_id: productId, $user_id: userId, $quantity: quantity };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve({ productId });
      });
    });
  },

  add({ productId, userId }) {
    const sql = `UPDATE carts
          SET quantity = quantity + 1
          WHERE user_id = $user_id
          AND product_id = $product_id`;

    const params = { $product_id: productId, $user_id: userId };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve({ productId });
      });
    });
  },

  getItem({ productId, userId }) {
    const sql = `SELECT *
          FROM carts
          WHERE product_id = $product_id
          AND user_id = $user_id`;

    const params = { $product_id: productId, $user_id: userId };

    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  getAll(userId) {
    const sql = `SELECT p.id, p.title, p.price, c.quantity, p.price * c.quantity AS subtotal
            FROM products p
            JOIN carts c
            ON p.id = c.product_id
            WHERE c.user_id = $user_id
            GROUP BY p.title`;

    const params = { $user_id: userId };

    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        console.log(rows, userId);
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  delete({ productId, userId }) {
    const sql = `DELETE FROM carts
                WHERE user_id = $user_id
                AND product_id = $product_id`;

    const params = { $user_id: userId, $product_id: productId };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve({ productId });
      });
    });
  },

  subtract({ productId, userId }) {
    const sql = `UPDATE carts
          SET quantity = quantity - 1
          WHERE user_id = $user_id
          AND product_id = $product_id`;

    const params = { $product_id: productId, $user_id: userId };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve({ productId });
      });
    });
  },

  deleteAll({ userId }) {
    const sql = `DELETE FROM carts
        WHERE user_id = $user_id`;

    const params = { $user_id: userId };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve({ userId });
      });
    });
  },
};

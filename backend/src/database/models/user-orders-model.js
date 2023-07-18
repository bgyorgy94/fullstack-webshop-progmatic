import db from '../connection';

export default {
  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Orders table creation error: ${err.message}`);
        throw err;
      }
    });
  },

  create({ userId }) {
    const sql = `
    INSERT INTO orders (user_id)
    VALUES ($user_id)
  `;
    const params = { $user_id: userId };

    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ orderId: this.lastID });
      });
    });
  },

  getAll({ userId }) {
    const sql = `
    SELECT o.id, o.user_id, p.title, p.price, c.quantity, c.subtotal
    FROM orders o
    JOIN carts c
    ON o.user_id = c.user_id
    JOIN products p
    ON c.product_id = p.id
    WHERE o.user_id = $user_id
    GROUP BY o.id, p.title
  `;
    const params = { $user_id: userId };

    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getById({ userId, orderId }) {
    const sql = `
    SELECT o.id, o.user_id, p.title, p.price, c.quantity, c.subtotal
    FROM orders o
    JOIN carts c
    ON o.user_id = c.user_id
    JOIN products p
    ON c.product_id = p.id
    WHERE o.id = $id AND o.user_id = $user_id
    GROUP BY o.id, p.title
  `;
    const params = { $user_id: userId, $id: orderId };

    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  delete({ userId, orderId }) {
    const sql = `
    DELETE FROM orders
    WHERE id = $id AND user_id = $user_id
  `;
    const params = { $id: orderId, $user_id: userId };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve({ orderId });
      });
    });
  },
};

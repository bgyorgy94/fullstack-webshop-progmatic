import db from '../connection';

export default {
  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
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

  createOrderProductsTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS order_products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,
        price REAL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `;
    db.run(sql, (err) => {
      if (err) throw err;
    });
  },

  create(userId) {
    const sql = `
    INSERT INTO orders (user_id)
    VALUES ($userId)
  `;
    const params = { $userId: userId };

    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ orderId: this.lastID });
      });
    });
  },

  createOrderProduct(orderId, productId, quantity, price) {
    const sql = `
      INSERT INTO order_products (order_id, product_id, quantity, price)
      VALUES ($orderId, $productId, $quantity, $price)
    `;

    const params = { $orderId: orderId, $productId: productId, $quantity: quantity, $price: price };

    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
  },

  getAllOrdersInfo(userId) {
    const sql = `
    SELECT o.id, o.created_at, SUM(op.price * op.quantity) AS total
    FROM order_products op
    JOIN orders o
    ON op.order_id = o.id
    WHERE o.user_id = $userId
    GROUP BY o.id
  `;
    const params = { $userId: userId };

    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getOrderInfo(orderId) {
    const sql = `
    SELECT o.id, o.created_at, SUM(op.price * op.quantity) AS total
    FROM order_products op
    JOIN orders o
    ON op.order_id = o.id
    WHERE o.id = $orderId
    `;
    const params = { $orderId: orderId };

    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getOrderInfoByUserId(userId, orderId) {
    const sql = `
    SELECT o.id, o.created_at, SUM(op.price * op.quantity) AS total
    FROM order_products op
    JOIN orders o
    ON op.order_id = o.id
    WHERE o.id = $orderId AND o.user_id = $userId
    `;
    const params = { $orderId: orderId, $userId: userId };

    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getAllOrderDetails({ orderId }) {
    const sql = `
      SELECT p.id, p.title, op.quantity, op.price, op.quantity * op.price AS subtotal
      FROM order_products op
      JOIN products p ON op.product_id = p.id
      WHERE op.order_id = $order_id
    `;
    const params = { $order_id: orderId };

    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getAllOrderDetailsByUserId({ userId, orderId }) {
    const sql = `
      SELECT p.id, p.title, op.quantity, op.price, op.quantity * op.price AS subtotal
      FROM order_products op
      JOIN products p ON op.product_id = p.id
      JOIN orders o ON op.order_id = o.id
      WHERE o.user_id = $user_id AND o.id = $order_id
    `;

    const params = { $order_id: orderId, $user_id: userId };

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

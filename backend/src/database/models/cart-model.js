import db from '../connection';

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS carts (
            product_id INTEGER,
            user_id TEXT,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`;

        db.run(sql, (err) => {
            if (err) {
                console.log('Cart table creation error:', err.message);
                throw err;
            }
        });
    },

    create({ productId, userId }) {
        const sql = `INSERT INTO carts (product_id, user_id)
            VALUES ($product_id, $user_id)`;
        
        const params = { $product_id: productId, $user_id: userId};

        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if (err) reject(err);
                else resolve({ productId });
            });
        });
    },

    getAll({ userId }) {
        const sql = `SELECT p.title, p.price, count(*) quantity, sum(price) subtotal
            FROM products p
            JOIN carts c
            ON p.id = c.product_id
            WHERE c.user_id = $user_id
            GROUP BY p.title`;
        
        const params = { $user_id: userId};

        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

    },

    delete({ productId, userId }) {
        const sql = `DELETE FROM carts
            WHERE rowid = (
                SELECT MIN(rowid)
                FROM carts
                WHERE user_id = $user_id
                AND product_id = $product_id)`;

        const params = { $user_id: userId, $product_id: productId};

        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if (err) reject(err);
                else resolve({productId})
            });
        });
    }
}
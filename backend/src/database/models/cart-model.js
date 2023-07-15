import db from '../connection';

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS carts (
            product_id INTEGER,
            user_id TEXT,
            is_ordered BOOLEAN DEFAULT false,
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

    create({ productId, userId, isOrdered = false }) {
        const sql = `INSERT INTO carts (product_id, user_id, is_ordered)
            VALUES ($product_id, $user_id, $is_ordered)`;
        
        const params = { $product_id: productId, $user_id: userId, $is_ordered: isOrdered};

        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if (err) reject(err);
                else resolve({ productId });
            });
        });
    }
}
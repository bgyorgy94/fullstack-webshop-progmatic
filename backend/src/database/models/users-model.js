import db from '../connection';
import {nanoid} from 'nanoid';

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT,
            password_hash TEXT,
            is_admin BOOLEAN
        )`;
        db.run(sql, (err) => {
            if(err) {
                console.log('Users table creation error:', err.message);
                throw err;
            }
        })
    },

    create({email, passwordHash, isAdmin = false}) {
        const id = nanoid();
        const sql = `INSERT INTO users (id, email, password_hash, is_admin)
            VALUES ($id, $email, $passwordHash, $isAdmin)`;

        const params = {$id: id, $email: email, $passwordHash: passwordHash, $isAdmin: isAdmin};

        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if(err) reject(err);
                else resolve({email, isAdmin, id})
            });
        });
    },
};
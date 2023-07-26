import { nanoid } from 'nanoid';
import db from '../connection';

export default {
  createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE,
            password_hash TEXT,
            is_admin BOOLEAN DEFAULT false
        )`;
    db.run(sql, (err) => {
      if (err) {
        console.log('Users table creation error:', err.message);
        throw err;
      }
    });
  },

  create({ email, passwordHash, isAdmin = false }) {
    const id = nanoid();
    const sql = `INSERT INTO users (id, email, password_hash, is_admin)
            VALUES ($id, $email, $passwordHash, $isAdmin)`;

    const params = { $id: id, $email: email, $passwordHash: passwordHash, $isAdmin: isAdmin };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve({ email, isAdmin, id });
      });
    });
  },

  getByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';

    return new Promise((resolve, reject) => {
      db.get(sql, email, (err, row) => {
        if (err) reject(err);
        else {
          const { id, password_hash: passwordHash, is_admin: isAdmin } = row;
          resolve({ id, email, passwordHash, isAdmin });
        }
      });
    });
  },

  getAll() {
    const sql = 'SELECT * FROM users';

    return new Promise((resolve, reject) => {
      db.all(sql, (err, rows) => {
        if (err) reject(err);
        else {
          resolve(rows.map((row) => ({ id: row.id, email: row.email, isAdmin: row.is_admin })));
        }
      });
    });
  },

  find({ id }) {
    const sql = `SELECT * FROM users WHERE id = $id`;
    const param = {
      $id: id,
    };
    return new Promise((resolve, reject) => {
      db.get(sql, param, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  update({ id, email, passwordHash, isAdmin }) {
    const sql = `UPDATE users SET ${email ? 'email = $email' : ''}${
      passwordHash ? ', password_hash = $passwordHash' : ''
    }${isAdmin ? ', is_admin = $isAdmin' : ''} WHERE id = $id`;
    const params = {
      $id: id,
      $email: email,
      $password_hash: passwordHash,
      $is_admin: isAdmin,
    };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve({ email, passwordHash, isAdmin });
      });
    });
  },

  delete({ id }) {
    const sql = `DELETE FROM users WHERE id = $id`;
    const param = { $id: id };

    return new Promise((resolve, reject) => {
      db.run(sql, param, (err) => {
        if (err) reject(err);
        else resolve({ id });
      });
    });
  },
};

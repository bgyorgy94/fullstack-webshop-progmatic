import db from '../connection';

export default {
  async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        name TEXT
      )
    `;

    try {
      await new Promise((resolve, reject) => {
        db.run(sql, (err) => {
          if (err) {
            console.log(`Categories table creation error: ${err.message}`);
            reject(err);
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      throw error;
    }
  },
  async getAll() {
    const sql = 'SELECT * FROM categories';

    try {
      return await new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    } catch (error) {
      throw error;
    }
  },
  async getById(id) {
    const sql = 'SELECT * FROM categories WHERE id = $id';
    const params = { $id: id };

    try {
      return await new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    } catch (error) {
      throw error;
    }
  },
  // get by name for validation (in categories-service)
  async getByName(name) {
    const sql = 'SELECT * FROM categories WHERE name = $name';
    const params = { $name: name };

    try {
      return await new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    } catch (error) {
      throw error;
    }
  },
  async create({ name }) {
    const sql = 'INSERT INTO categories(name) VALUES($name)';
    const params = { $name: name };

    try {
      return await new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ name, id: this.lastID });
          }
        });
      });
    } catch (error) {
      throw error;
    }
  },
  async delete(id) {
    const sql = 'DELETE FROM categories WHERE id = $id';
    const params = { $id: id };

    try {
      await new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      throw error;
    }
  },
  async update(id, name) {
    const sql = 'UPDATE categories SET name = $name WHERE id = $id';
    const params = { $name: name, $id: id };

    try {
      await new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, name });
          }
        });
      });
    } catch (error) {
      throw error;
    }
  },
};

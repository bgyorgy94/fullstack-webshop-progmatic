import Sqlite3 from 'sqlite3';
import { resolve } from 'path';

Sqlite3.verbose();

const db = new Sqlite3.Database(resolve('src', 'database', 'db', 'webshop.db'), (err) => {
  if (err) {
    console.log('Database connection error!');
    process.exit(1);
  } else {
    console.log('Db connection successful');
  }
});

export default db;

import Sequelize from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/database/db/webshop.db',
});

// Immediately Invoked Function Expression (IIFE)
// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
// new scope for async/await
// + () at the end of the function to call it immediately, because top level code cannot be async

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Db connection successful');
  } catch (err) {
    console.log('Database connection error!', err);
    process.exit(1);
  }
})();

export default sequelize;

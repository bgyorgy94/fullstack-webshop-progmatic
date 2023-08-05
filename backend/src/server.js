import app from './app';
import { PORT } from './constants';
import { sequelize } from './database/connection';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Db connection successful');
  } catch (err) {
    console.log('Database connection error!', err);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

import Sequelize from 'sequelize';
import UsersModel from './models/users-model';
import ProductsModel from './models/products-model';
import CategoriesModel from './models/categories-model';
import OrdersModel from './models/orders-model';
import OrderProductsModel from './models/orderproducts-model';
import CartsModel from './models/carts-model';
import CartProductsModel from './models/cartproducts-model';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/database/db/webshop.db',
  logging: false,
});

const Users = UsersModel(sequelize, Sequelize);
const Products = ProductsModel(sequelize, Sequelize);
const Categories = CategoriesModel(sequelize, Sequelize);
const Carts = CartsModel(sequelize, Sequelize);
const Orders = OrdersModel(sequelize, Sequelize);
const OrderProducts = OrderProductsModel(sequelize, Sequelize);
const CartProducts = CartProductsModel(sequelize, Sequelize);

Users.hasOne(Carts, { as: 'cart' });
Carts.belongsTo(Users, { as: 'user', foreignKey: 'userId' });

Users.hasMany(Orders);
Orders.belongsTo(Users);

Products.belongsToMany(Orders, { through: OrderProducts });
Orders.belongsToMany(Products, { as: 'products', through: OrderProducts });

Products.belongsTo(Categories, { as: 'categories', foreignKey: 'categoryId' });
Categories.hasMany(Products, { as: 'products' });

Products.belongsToMany(Carts, {
  through: CartProducts,
  as: 'carts',
});
Carts.belongsToMany(Products, {
  through: CartProducts,
  as: 'products',
});

sequelize.sync();

export { sequelize, Users, Products, Categories, Carts, Orders, OrderProducts, CartProducts };

import Sequelize from 'sequelize';
import UsersModel from './models/users-model';
import ProductsModel from './models/products-model';
import MainCategoriesModel from './models/main-categories-model';
import SubCategoriesModel from './models/sub-categories-model';
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
const MainCategories = MainCategoriesModel(sequelize, Sequelize);
const SubCategories = SubCategoriesModel(sequelize, Sequelize);
const Carts = CartsModel(sequelize, Sequelize);
const Orders = OrdersModel(sequelize, Sequelize);
const OrderProducts = OrderProductsModel(sequelize, Sequelize);
const CartProducts = CartProductsModel(sequelize, Sequelize);

Users.hasOne(Carts, { as: 'cart', foreignKey: 'userId' });
Carts.belongsTo(Users, { as: 'user', foreignKey: 'userId' });

Users.hasMany(Orders);
Orders.belongsTo(Users);

Products.belongsToMany(Orders, { through: OrderProducts });
Orders.belongsToMany(Products, { as: 'products', through: OrderProducts });

MainCategories.hasMany(SubCategories, { as: 'subCategories', foreignKey: 'mainCategoryId' });
SubCategories.belongsTo(MainCategories, { as: 'mainCategory', foreignKey: 'mainCategoryId' });

SubCategories.hasMany(Products, { as: 'products' });
Products.belongsTo(SubCategories, { as: 'subCategory', foreignKey: 'subCategoryId' });

Products.belongsToMany(Carts, {
  through: CartProducts,
  as: 'carts',
});
Carts.belongsToMany(Products, {
  through: CartProducts,
  as: 'products',
});

sequelize.sync();

export {
  sequelize,
  Users,
  Products,
  MainCategories,
  SubCategories,
  Carts,
  Orders,
  OrderProducts,
  CartProducts,
};

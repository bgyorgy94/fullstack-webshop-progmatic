const CartsModel = (sequelize, DataTypes) => {
  const Carts = sequelize.define(
    'Carts',
    {},
    {
      underscored: true,
    },
  );

  return Carts;
};

export default CartsModel;

const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  email: { 
    type: DataTypes.STRING, 
    unique: true 
  },
  password: { 
    type: DataTypes.STRING 
  },
  role: { 
    type: DataTypes.STRING, 
    defaultValue: 'USER' 
  },
});

const Basket = sequelize.define('basket', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
});

const BasketProduct = sequelize.define('basket_product', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
});

const Product = sequelize.define('product', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false 
  },
  info: {
    type: DataTypes.STRING,
    defaultValue: 'Однолетнее травянистое растение, вид рода Арбуз (Citrullus) семейства Тыквенные (Cucurbitaceae)'
  },
  price: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  rating: { 
    type: DataTypes.INTEGER, 
    defaultValue: 0 
  },
  img: { 
    type: DataTypes.STRING, 
    allowNull: true 
  }
});

const Vendor = sequelize.define('vendor', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: DataTypes.STRING,
    allowNull: false 
  }
});

const Rating = sequelize.define('rating', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  rate: { 
    type: DataTypes.INTEGER,
    allowNull: false 
  }
});

const Like = sequelize.define('like', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  }
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasMany(BasketProduct);
BasketProduct.belongsTo(User);

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

Vendor.hasMany(Product);
Product.belongsTo(Vendor);

User.hasMany(Like);
Like.belongsTo(User);

Product.hasMany(Like);
Like.belongsTo(Product);


module.exports = {
  User, 
  Basket, 
  BasketProduct, 
  Product,
  Vendor, 
  Rating,
  Like,
};
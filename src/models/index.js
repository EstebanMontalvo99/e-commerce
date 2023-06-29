const Product = require("./Product");
const Category = require("./Category");
const Cart = require("./Cart");
const User = require("./User");

Product.belongsTo(Category); //GENERA EN LA TABLA PRODUCT categoryId
Category.hasMany(Product);

//Cart-->userId
Cart.belongsTo(User);
User.hasOne(Cart);

//Cart-->productId
Cart.belongsTo(Product);
Product.hasMany(Cart);

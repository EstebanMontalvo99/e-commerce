const Product = require("./Product");
const Category = require("./Category");

Product.belongsTo(Category); //GENERA EN LA TABLA PRODUCT categoryId
Category.hasMany(Product);

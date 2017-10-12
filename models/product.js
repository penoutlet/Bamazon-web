var sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes){
  return sequelize.define('products', {
    product_name: {
      type:DataTypes.STRING,
      allowNull: false
  },
    price: {
    type:DataTypes.INTEGER,
    allowNull: false
  },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

      department: {
      type:DataTypes.STRING,
      allowNull: false
    }

  });
}

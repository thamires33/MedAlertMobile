const { sequelize, Sequelize } = require('./db'); 

const Image = sequelize.define('Image', {
  filename: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
Image.sync({force:true});
module.exports = Image;

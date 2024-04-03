const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'testbase', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = { sequelize }
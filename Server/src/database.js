const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'silver-micro', 'bouba', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = { sequelize }
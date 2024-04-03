const { Sequelize, DataTypes} = require('sequelize');
const db = require('../../database');

const Reservation = db.sequelize.define('Reservation', {
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    numberOfGuests: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Reservation;

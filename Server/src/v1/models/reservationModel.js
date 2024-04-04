const { DataTypes, Model } = require('sequelize');
const db = require('../../database');

const Restaurant =  require('./restaurantModel');
const User = require('./userModel');

class Reservation extends Model {}

Reservation.init({
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    people: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: db.sequelize,
    modelName: 'Reservation',
})

Reservation.belongsTo(User);
Reservation.belongsTo(Restaurant);

User.hasMany(Reservation, { onDelete: 'cascade', hooks: true });
Restaurant.hasMany(Reservation, { onDelete: 'cascade', hooks: true });

Reservation.sync({ force: false })

module.exports = Reservation;
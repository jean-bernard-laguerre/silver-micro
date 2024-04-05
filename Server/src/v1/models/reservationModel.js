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
        allowNull: false,
        validate: {
            isDate: {
                args: true,
                msg: "Date must be a valid date"
            },
            isAfter: {
                args: new Date().toISOString().split('T')[0]},
                msg: "Date must be after today"
        }
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    people: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: "Party size must be at least 1"
            }
        }
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
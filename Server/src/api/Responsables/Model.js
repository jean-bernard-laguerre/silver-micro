const { DataTypes, Model } = require('sequelize');
const db = require('../../database');
const config = require('../../config');
const role = config.adminRole;

const Restaurant = require('../Restaurants/Model');
const User = require('../Users/Model');

class Responsable extends Model {}

Responsable.init({
    role: {
        type: DataTypes.ENUM(role.responsable, role.patron),
        allowNull: false,
        validate: {
            isIn: {
                args: [[role.responsable, role.patron]],
                msg: "Must be a valid role"
            }
        }
    }
}, {
    sequelize: db.sequelize,
    modelName: 'Responsable'
})

Responsable.belongsTo(User);
Responsable.belongsTo(Restaurant);

User.hasMany(Responsable, { onDelete: 'cascade', hooks: true });
Restaurant.hasMany(Responsable, { onDelete: 'cascade', hooks: true });

Responsable.sync({ force: false })

module.exports = Responsable;
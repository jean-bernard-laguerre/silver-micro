const { DataTypes, Model } = require('sequelize');
const db = require('../../database');
const config = require('../../config');
const role = config.role;

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(role.user, role.admin),
        defaultValue: role.user,
        allowNull: false
    }
}, {
    sequelize: db.sequelize,
    modelName: 'User'
})

User.sync({ force: false })

module.exports = User;
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../database');

const Restaurant = require("../models/restaurantModel")
const User = require("../models/userModel")

const Avis = db.sequelize.define('Avis', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    //Evaluation avec Note 
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            
            min: {
                args: 1,
                msg: 'Valeur min 1'
            },
            max: {
                args: 5,
                msg: 'Valeur max 5'
            }
        }
    },
    //Evaluation sans Avis Ecrit
    review: {
        type: DataTypes.TEXT,
        allowNull: true 
    }
});

Avis.belongsTo(Restaurant)
Avis.belongsTo(User)

User.hasMany(Avis, {onDelete: 'cascade', hooks:true})
Restaurant.hasMany(Avis, {onDelete: 'cascade', hooks:true })

Avis.sync({ force: false });

module.exports = Avis;

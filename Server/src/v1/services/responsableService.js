const Responsable = require('../models/responsableModel');
const User = require('../models/userModel');

const role = require('../../config').role;

/**
 * Get all responsables
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getResponsables = (req, res) => {
    Responsable.findAll().then(responsables => {
        res.json({ responsables });
    });
};

/**
 * Get a responsable by id
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getResponsablesByUser = (req, res) => {
    Responsable.findAll({ where: { userId: req.params.userId } }).then(responsables => {
        if (!responsables) {
            return res.status(404).json({ error: "Responsable not found" });
        }
        res.json({ responsables });
    });
}

/**
 * Get all responsables by restaurant
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getResponsablesByRestaurant = (req, res) => {
    Responsable.findAll({ where: { restaurantId: req.params.restaurantId } }).then(responsables => {
        res.json({ responsables });
    });
}

/**
 * Create a new responsable
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createResponsable = (req, res) => {
    User.findByPk(req.body.userId).then(user => {
        if (user) {
            user.update({
                role: role.admin
            });
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    });
    Responsable.findOne({ where: { UserId: req.body.userId, RestaurantId: req.body.restaurantId } }).then(responsable => {
        if (responsable) {
            return res.status(404).json({ error: "Responsable already exist" });
        } else {
            Responsable.create({
                UserId: req.body.userId,
                RestaurantId: req.body.restaurantId,
                role: req.body.role
            }).then(responsable => {
                res.json({ responsable });
            });
        }
    });
}

/**
 * Update a responsable
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateResponsable = (req, res) => {
    Responsable.findOne({ where: { UserId: req.body.userId, RestaurantId: req.body.restaurantId } }).then(responsable => {
        responsable.update({
            role: req.body.role
        }).then(responsable => {
            res.json({ responsable });
        });
    });
}

/**
 * Delete a responsable
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteResponsable = (req, res) => {
    Responsable.findOne({ where: { userId: req.body.userId, restaurantId: req.body.restaurantId } }).then(responsable => {
        responsable.destroy().then(() => {
            res.json({ message: "Responsable deleted" });
        });
    });
}

module.exports = {
    getResponsables,
    getResponsablesByUser,
    getResponsablesByRestaurant,
    createResponsable,
    updateResponsable,
    deleteResponsable
};
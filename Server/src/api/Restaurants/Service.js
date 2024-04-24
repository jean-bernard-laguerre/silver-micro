const Restaurant = require('./Model');
const Responsable = require('../Responsables/Model');
const User = require('../Users/Model');

const adminRole = require('../../config').adminRole;
const role = require('../../config').role;

/**
 * Get all restaurants
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getRestaurants = (req, res) => {
    Restaurant.findAll().then(restaurants => {
        res.json({ restaurants });
    });
};

/**
 * Get a restaurant by id
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getRestaurant = (req, res) => {
    Restaurant.findByPk(req.params.restaurantId).then(restaurant => {
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        res.json({ restaurant });
    });
};

/**
 * Create a new restaurant
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const createRestaurant = (req, res) => {

    const item = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        description: req.body.description,
        capacity: req.body.capacity
    };

    Restaurant.build(item).validate().then(() => {
        Restaurant.create(item).then(restaurant => {
            Responsable.create({
                UserId: req.user.id,
                RestaurantId: restaurant.id,
                role: adminRole.patron
            });

            User.findByPk(req.user.id).then(user => {
                user.update({
                    role: role.admin
                });
            });

            res.json({ restaurant });
        });
    }).catch(error => {
        res.status(400).json({ error: error.message });
    });
}

/**
 * Update a restaurant
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateRestaurant = (req, res) => {

    const item = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        description: req.body.description,
        capacity: req.body.capacity
    };

    Restaurant.findByPk(req.params.restaurantId).then(restaurant => {
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        restaurant.update(item, {fields: Object.keys(item)}).then(restaurant => {
            res.json({ restaurant });
        }).catch(error => {
            res.status(400).json({ error: error.message });
        });
    });
}

/**
 * Delete a restaurant
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const deleteRestaurant = (req, res) => {
    Restaurant.findByPk(req.params.restaurantId).then(restaurant => {
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        restaurant.destroy().then(() => {
            res.json({ message: "Restaurant deleted" });
        });
    });
}

module.exports = {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};
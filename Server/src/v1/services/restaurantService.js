const Restaurant = require('../models/restaurantModel');
const Responsable = require('../models/responsableModel');
const User = require('../models/userModel');

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
    Restaurant.findByPk(req.params.id).then(restaurant => {
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

    // add the user creating the restaurant as patron of the restaurant
    Restaurant.create({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        rating: req.body.rating,
        image: req.body.image,
        description: req.body.description
    }).then(restaurant => {

        console.log(req.user.id, restaurant.id)
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
}

/**
 * Update a restaurant
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateRestaurant = (req, res) => {
    Restaurant.findByPk(req.params.id).then(restaurant => {
        restaurant.update({
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            rating: req.body.rating,
            image: req.body.image,
            description: req.body.description
        }).then(restaurant => {
            res.json({ restaurant });
        });
    });
}

/**
 * Delete a restaurant
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const deleteRestaurant = (req, res) => {
    Restaurant.findByPk(req.params.id).then(restaurant => {
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
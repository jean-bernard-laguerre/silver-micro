const services = require("../services/restaurantService");

const getRestaurants = (req, res) => {
    services.getRestaurants(req, res);
}

const getRestaurant = (req, res) => {
    services.getRestaurant(req, res);
}

const createRestaurant = (req, res) => {
    services.createRestaurant(req, res);
}

const updateRestaurant = (req, res) => {
    services.updateRestaurant(req, res);
}

const deleteRestaurant = (req, res) => {
    services.deleteRestaurant(req, res);
}

module.exports = {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};
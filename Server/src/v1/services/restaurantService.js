const RestaurantModel = require('../models/restaurantModel');

const getRestaurants = (req, res) => {
    RestaurantModel.findAll().then(restaurants => {
        res.json({ restaurants });
    });
};

const getRestaurant = (req, res) => {
    RestaurantModel.findByPk(req.params.id).then(restaurant => {
        res.json({ restaurant });
    });
};

const createRestaurant = (req, res) => {
    RestaurantModel.create({
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
}

const updateRestaurant = (req, res) => {
    RestaurantModel.findByPk(req.params.id).then(restaurant => {
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

const deleteRestaurant = (req, res) => {
    RestaurantModel.findByPk(req.params.id).then(restaurant => {
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
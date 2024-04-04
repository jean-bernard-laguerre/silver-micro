const express = require("express");
const config = require("../../config");
const restaurantController = require("../controllers/restaurantController")

const authMiddleware = require("../../middlewares/authMiddleware");
const adminMiddleware = require("../../middlewares/adminMiddleware");

const restaurantRouter = express.Router();

restaurantRouter.get("/" , restaurantController.getRestaurants);
restaurantRouter.get("/:id" , restaurantController.getRestaurant);
restaurantRouter.post("/" , authMiddleware(), restaurantController.createRestaurant);
restaurantRouter.put("/:id" , authMiddleware(), adminMiddleware(config.adminRole.patron), restaurantController.updateRestaurant);
restaurantRouter.delete("/:id" , authMiddleware(), adminMiddleware(config.adminRole.patron), restaurantController.deleteRestaurant);

module.exports = restaurantRouter;
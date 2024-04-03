const express = require("express");
const authMiddleware = require("../../middlewares/middleware");
const restaurantController = require("../controllers/restaurantController")

const restaurantRouter = express.Router();

restaurantRouter.get("/" , restaurantController.getRestaurants);
restaurantRouter.get("/:id" , restaurantController.getRestaurant);
restaurantRouter.post("/" , restaurantController.createRestaurant);
restaurantRouter.put("/:id" , restaurantController.updateRestaurant);
restaurantRouter.delete("/:id" , restaurantController.deleteRestaurant);

module.exports = restaurantRouter;
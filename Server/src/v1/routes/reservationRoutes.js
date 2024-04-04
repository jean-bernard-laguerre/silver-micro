const express = require("express");
const reservationController = require("../controllers/reservationController")

const authMiddleware = require("../../middlewares/authMiddleware");

const reservationRouter = express.Router();

reservationRouter.get("/" , reservationController.getReservations);
reservationRouter.get("/:id" , reservationController.getReservation);
reservationRouter.get("/user/:userId" , reservationController.getReservationsByUser);
reservationRouter.get("/restaurant/:restaurantId" , reservationController.getReservationsByRestaurant);
reservationRouter.post("/" , authMiddleware(), reservationController.createReservation);
reservationRouter.put("/:id" , authMiddleware(), reservationController.updateReservation);
reservationRouter.delete("/:id" , authMiddleware(), reservationController.deleteReservation);

module.exports = reservationRouter;
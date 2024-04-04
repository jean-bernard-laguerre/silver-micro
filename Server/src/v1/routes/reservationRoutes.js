const express = require("express");
const authMiddleware = require("../../middlewares/middleware");
const reservationController = require("../controllers/reservationController")

const reservationRouter = express.Router();

reservationRouter.post("/" , reservationController.createReservation);
reservationRouter.get("/" , reservationController.getAllReservations);
reservationRouter.get("/:id" , reservationController.getReservationById);
reservationRouter.put("/:id" , reservationController.updateReservation);
reservationRouter.delete("/:id" , reservationController.deleteReservation);

module.exports = reservationRouter;

const express = require("express");
const authMiddleware = require("../../middlewares/middleware");
const reservationController = require("../controllers/reservationController")

const reservationRouter = express.Router();

restaurantRouter.post("/" , reservationController.createReservation);
restaurantRouter.get("/" , reservationController.getAllReservations);
restaurantRouter.get("/:id" , reservationController.getReservationById);
restaurantRouter.put("/:id" , reservationController.updateReservation);
restaurantRouter.delete("/:id" , reservationController.deleteReservation);

module.exports = reservationRouter;
// // Route to create a new reservation
// reservationRouter.post('/', authMiddleware.authenticate, reservationController.createReservation);

// // Route to get all reservations
// reservationRouter.get('/', authMiddleware.authenticate, reservationController.getAllReservations);

// // Route to get a single reservation by ID
// reservationRouter.get('/:id', authMiddleware.authenticate, reservationController.getReservationById);

// // Route to update an existing reservation
// reservationRouter.put('/:id', authMiddleware.authenticate, reservationController.updateReservation);

// // Route to delete a reservation
// reservationRouter.delete('/:id', authMiddleware.authenticate, reservationController.deleteReservation);
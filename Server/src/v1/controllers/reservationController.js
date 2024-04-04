const services = require("../services/reservationService");

const reservationController = {

    createReservation: async (req, res) => {
        try {
            const reservation = await services.createReservation(req.body);
            res.status(201).json(reservation);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while creating the reservation.");
        }
    },

    getAllReservations: async (req, res) => {
        try {
            const reservations = await services.getAllReservations();
            res.status(200).json(reservations);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while fetching the reservations.");
        }
    },

    getReservationById: async (req, res) => {
        try {
            const reservation = await services.getReservationById(req.params.id);
            if (reservation) {
                res.status(200).json(reservation);
            } else {
                res.status(404).send("Reservation not found.");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while fetching the reservation.");
        }
    },

    updateReservation: async (req, res) => {
        try {
            const updatedReservation = await services.updateReservation(req.params.id, req.body);
            if (updatedReservation) {
                res.status(200).json(updatedReservation);
            } else {
                res.status(404).send("Reservation not found.");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while updating the reservation.");
        }
    },

    deleteReservation: async (req, res) => {
        try {
            await services.deleteReservation(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while deleting the reservation.");
        }
    }

};

module.exports = reservationController;
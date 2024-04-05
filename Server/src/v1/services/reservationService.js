const Reservation = require('../models/reservationModel');

/**
 * Get all reservations
 * @param {Object} req
 * @param {Object} res
 */
const getReservations = (req, res) => {
    Reservation.findAll().then(reservations => {
        res.json({ reservations });
    });
};

/**
 * Get a reservation by id
 * @param {Object} req
 * @param {Object} res
 */
const getReservation = (req, res) => {
    Reservation.findByPk(req.params.id).then(reservation => {
        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        res.json({ reservation });
    });
};

/**
 * Get all reservations by user
 * @param {Object} req
 * @param {Object} res
 */
const getReservationsByUser = (req, res) => {
    Reservation.findAll({ where: { userId: req.params.userId } }).then(reservations => {
        res.json({ reservations });
    });
};

/**
 * Get all reservations by restaurant
 * @param {Object} req
 * @param {Object} res
 */
const getReservationsByRestaurant = (req, res) => {
    Reservation.findAll({ where: { restaurantId: req.params.restaurantId } }).then(reservations => {
        res.json({ reservations });
    });
};

/**
 * Create a new reservation
 * @param {Object} req
 * @param {Object} res
 */
const createReservation = (req, res) => {
    const item = {
        userId: req.body.userId,
        restaurantId: req.body.restaurantId,
        date: req.body.date,
        time: req.body.time,
        people: req.body.people
    };

    Reservation.build(item).validate().then(() => {
        Reservation.create(item).then(reservation => {
            res.json({ reservation });
        });
    }).catch(error => {
        res.status(400).json({ error: error.errors[0].message });
    });
};

/**
 * Update a reservation
 * @param {Object} req
 * @param {Object} res
 */
const updateReservation = (req, res) => {

    const item = {
        userId: req.body.userId,
        restaurantId: req.body.restaurantId,
        date: req.body.date,
        time: req.body.time,
        people: req.body.people
    };

    Reservation.findByPk(req.params.id).then(reservation => {
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        reservation.update(item, { fields: Object.keys(item) }).then(updatedReservation => {
            res.json({ reservation: updatedReservation });
        }).catch(error => {
            res.status(400).json({ error: error.errors[0].message });
        });
    });
};

/**
 * Delete a reservation
 * @param {Object} req
 * @param {Object} res
 */
const deleteReservation = (req, res) => {
    Reservation.findByPk(req.params.id).then(reservation => {
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        reservation.destroy().then(() => {
            res.json({ message: "Reservation deleted" });
        });
    });
};

module.exports = {
    getReservations,
    getReservation,
    getReservationsByUser,
    getReservationsByRestaurant,
    createReservation,
    updateReservation,
    deleteReservation
};
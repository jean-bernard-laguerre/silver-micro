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
    Reservation.create({
        userId: req.user.id,
        restaurantId: req.body.restaurantId,
        date: req.body.date,
        time: req.body.time,
        partySize: req.body.partySize
    }).then(reservation => {
        res.json({ reservation });
    });
};

/**
 * Update a reservation
 * @param {Object} req
 * @param {Object} res
 */
const updateReservation = (req, res) => {
    Reservation.findByPk(req.params.id).then(reservation => {
        reservation.update({
            userId: req.body.userId,
            restaurantId: req.body.restaurantId,
            date: req.body.date,
            time: req.body.time,
            partySize: req.body.partySize
        }).then(reservation => {
            res.json({ reservation });
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
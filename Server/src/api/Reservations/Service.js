const Reservation = require('./Model');
const Restaurant = require('../Restaurants/Model');

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
        UserId: req.user.id,
        RestaurantId: req.body.restaurantId,
        date: req.body.date,
        time: req.body.time,
        people: req.body.people
    };

    checkAvailability(item).then(available => {

        if (!available) {
            return res.status(400).json({ error: 'Restaurant is not available for this date and time' });
        }

        Reservation.build(item).validate().then(() => {
            Reservation.create(item).then(reservation => {
                res.json({ reservation });
            });
        }).catch(error => {
            res.status(400).json({ error: error.errors[0].message });
        });
    });
};

/**
 * Update a reservation
 * @param {Object} req
 * @param {Object} res
 */
const updateReservation = (req, res) => {

    const item = {
        UserId: req.body.userId,
        RestaurantId: req.body.restaurantId,
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

//function checking if the restaurant is available for the reservation date and time based on the restaurant capacity
const checkAvailability = (item) => {
    return Restaurant.findByPk(item.RestaurantId).then(restaurant => {
        return Reservation.findAll({
            where: {
                RestaurantId: item.RestaurantId,
                // date in DD/MM/YYYY format
                date: new Date(item.date).toISOString().split('T')[0],
                // time in HH:MM:SS format 
                time: (item.time + ':00')
            }
        }).then(reservations => {
            console.log(reservations);
            const totalPeople = reservations.reduce((acc, reservation) => acc + reservation.people, 0);
            return totalPeople + item.people <= restaurant.capacity;
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
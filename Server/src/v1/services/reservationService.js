const ReservationModel = require('../models/reservationModel');

const ReservationService = {

  // faire une reservation
  createReservation: async (reservationDetails) => {
    try {
      const reservation = await ReservationModel.create(reservationDetails);
      return reservation;
    } catch (error) {
      // gestion d'erreur
      throw error;
    }
  },

  // Récupérer une réservation par ID
  getReservationById: async (id) => {
    try {
      const reservation = await ReservationModel.findByPk(id);
      if (!reservation) {
        // Gestion d'erreur
        throw new Error('Reservation not found');
      }
      return reservation;
    } catch (error) {
      throw error;
    }
  },

  // Récupérer toutes les réservations
  getAllReservations: async () => {
    try {
      const reservations = await ReservationModel.findAll();
      return reservations;
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour une réservation
  updateReservation: async (id, updateDetails) => {
    try {
      const reservation = await ReservationModel.findByPk(id);
      if (!reservation) {
        throw new Error('Reservation not found');
      }
      const updatedReservation = await reservation.update(updateDetails);
      return updatedReservation;
    } catch (error) {
      throw error;
    }
  },

  // Supprimer une reservation
  deleteReservation: async (id) => {
    try {
      const reservation = await ReservationModel.findByPk(id);
      if (!reservation) {
        throw new Error('Reservation not found');
      }
      await reservation.destroy();
      return { message: 'Reservation successfully deleted' };
    } catch (error) {
      throw error;
    }
  }

};

module.exports = ReservationService;

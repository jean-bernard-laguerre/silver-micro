const avisModel = require('../models/avisModel');

const AvisService = {

  // Créer un Avis
  createAvis: async (avisDetails) => {
    try {
      const avis = await avisModel.create(avisDetails);
      return avis;
    } catch (error) {
      console.error("Error creating avis:", error);
      throw new Error('Failed to create avis');
    }
  },

  // obtenir l'avis par Utilisateur
  getAvisById: async (id) => {
    try {
      const avis = await avisModel.findByPk(id);
      if (!avis) {
        throw new Error('Avis not found');
      }
      return avis;
    } catch (error) {
      console.error("Error retrieving avis by ID:", error);
      throw new Error('Failed to retrieve avis');
    }
  },

  // obtenir tous les avis
  getAllAvis: async () => {
    try {
      const allAvis = await avisModel.findAll();
      return allAvis;
    } catch (error) {
      console.error("Error retrieving all avis:", error);
      throw new Error('Failed to retrieve avis');
    }
  },

  // MAJ un avis
  updateAvis: async (id, updateDetails) => {
    try {
      const avis = await avisModel.findByPk(id);
      if (!avis) {
        throw new Error('Avis not found');
      }
      const updatedAvis = await avis.update(updateDetails);
      return updatedAvis;
    } catch (error) {
      console.error("Error updating avis:", error);
      throw new Error('Failed to update avis');
    }
  },

  // Supprimer un Avis
  deleteAvis: async (id) => {
    try {
      const avis = await avisModel.findByPk(id);
      if (!avis) {
        throw new Error('Avis not found');
      }
      await avis.destroy();
      return { message: 'Avis successfully deleted' };
    } catch (error) {
      console.error("Error deleting avis:", error);
      throw new Error('Failed to delete avis');
    }
  }

};

module.exports = AvisService;

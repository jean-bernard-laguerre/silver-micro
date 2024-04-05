const services = require("../services/avisService");

const avisController = {

    createAvis: async (req, res) => {
        try {
            const avis = await services.createAvis(req.body);
            res.status(201).json(avis);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while creating the review.");
        }
    },

    getAllAvis: async (req, res) => {
        try {
            const allAvis = await services.getAllAvis();
            res.status(200).json(allAvis);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while fetching all reviews.");
        }
    },

    getAvisById: async (req, res) => {
        try {
            const avis = await services.getAvisById(req.params.id);
            if (avis) {
                res.status(200).json(avis);
            } else {
                res.status(404).send("Review not found.");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while fetching the review.");
        }
    },

    updateAvis: async (req, res) => {
        try {
            const updatedAvis = await services.updateAvis(req.params.id, req.body);
            if (updatedAvis) {
                res.status(200).json(updatedAvis);
            } else {
                res.status(404).send("Review not found.");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while updating the review.");
        }
    },

    deleteAvis: async (req, res) => {
        try {
            await services.deleteAvis(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while deleting the review.");
        }
    }

};

module.exports = avisController;

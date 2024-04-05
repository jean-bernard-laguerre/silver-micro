const express = require("express");
const avisController = require("../controllers/avisController");

const avisRouter = express.Router();

// Publier un avis
avisRouter.post("/", avisController.createAvis);

// obtenir les avis
avisRouter.get("/", avisController.getAllAvis);

// obtenir un avis par Id
avisRouter.get("/:id", avisController.getAvisById);

// MAJ d'un avis uniquement si l'utilisateur est autorisé
avisRouter.put("/:id", avisController.updateAvis);

// Supprimer un avis uniquement si l'utilisateur est autorisé
avisRouter.delete("/:id", avisController.deleteAvis);

module.exports = avisRouter;

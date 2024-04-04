const express = require("express");
const responsableController = require("../controllers/responsableController")

const authMiddleware = require("../../middlewares/authMiddleware");
const adminMiddleware = require("../../middlewares/adminMiddleware");

const adminRole = require("../../config").adminRole;

const responsableRouter = express.Router();

responsableRouter.get("/" , responsableController.getResponsables);
responsableRouter.get("/user/:userId" , responsableController.getResponsablesByUser);
responsableRouter.get("/restaurant/:restaurantId", responsableController.getResponsablesByRestaurant);
responsableRouter.post("/" , authMiddleware(), adminMiddleware(adminRole.patron), responsableController.createResponsable);
responsableRouter.put("/user/:userId" , authMiddleware(), adminMiddleware(adminRole.patron), responsableController.updateResponsable);
responsableRouter.delete("/user/:userId" , authMiddleware(), adminMiddleware(adminRole.patron), responsableController.deleteResponsable);

module.exports = responsableRouter;
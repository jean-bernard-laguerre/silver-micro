const express = require("express");
const authMiddleware = require("../../middlewares/middleware");
const userController = require("../../controllers/userController");

const router = express.Router();
router.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });});
router.get("/logout", (req, res) => {
    res.json({ message: "GoodBye from server" });});

router.post("/auth", userController.authenticate);
router.post("/register", userController.register);

module.exports = router;
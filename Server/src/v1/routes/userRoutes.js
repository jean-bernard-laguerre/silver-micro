const express = require("express");
const authMiddleware = require("../../middlewares/middleware");
const userController = require("../controllers/userController")

const userRouter = express.Router();
userRouter.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });});
userRouter.get("/logout", (req, res) => {
    res.json({ message: "GoodBye from server" });});

userRouter.post("/auth", userController.authenticate);
userRouter.post("/register", userController.register);

module.exports = userRouter;
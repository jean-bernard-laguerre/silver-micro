require('dotenv').config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(express.json());
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

const userRoutes = require("./src/v1/routes/userRoutes");
const restaurantRoutes = require("./src/v1/routes/restaurantRoutes");
const responsableRoutes = require("./src/v1/routes/responsableRoutes");
const reservationRoutes = require("./src/v1/routes/reservationRoutes");
const avisRoutes = require("./src/v1/routes/avisRoutes");


app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/restaurant/", restaurantRoutes);
app.use("/api/v1/responsable/", responsableRoutes);
app.use("/api/v1/reservation/", reservationRoutes);
app.use("/api/v1/avis/", avisRoutes);


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});
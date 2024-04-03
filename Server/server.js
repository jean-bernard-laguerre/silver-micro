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

app.use("/api/v1/user/", userRoutes);

  
app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});
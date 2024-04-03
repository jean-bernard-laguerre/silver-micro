const UserModel = require("../v1/models/userModel")
const auth = require("./auth")
const hash = require('hash.js')

const register = (req, res) => {
    
    let email = req.body.email;
    let username = req.body.username;
    // hash the password
    let password = req.body.password;
    password = hash.sha256().update(password).digest('hex');

    if (!(email && username && password)) {return false};

    UserModel.findOne({ where: { email: email } }).then(user => {
        if (user) {
            res.json({  message: "Register failed - User already exist",
                        success: false });
        } else {
            UserModel.create({
                username: username,
                password: password,
                email: email
            }).then(user => {
                res.json({  message: "Registered Succesfully",
                            success: true });
            });
        }
    });
}

const authentication = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    password = hash.sha256().update(password).digest('hex');

    if (!(email && password)) { return false };

    UserModel.findOne({ where: { email: email } }).then(user => {
        if (!user) {
            res.json({  message: "Login Failed - User Not Found",
                        success: false });
            return false;
        }
        if (user.password !== password) {
            res.json({  message: "Login Failed - Password Incorrect",
                        success: false });
            return false;
        }
        else {
            res.json({  message: "Logged in Successfully",
                        success: true,
                        id: user.id,
                        username: user.username,
                        token: auth.generateToken(user)
                    });
            return true;
        }
    });
}

module.exports = { register, authentication }
const login = require("../services/userService");
const tools = require("../services/tools");

const authenticate = (req, res) => {
    login.authentication(req, res)
};

const register = (req, res) => {
    login.register(req, res);
};

module.exports = {
    authenticate,
    register,
};
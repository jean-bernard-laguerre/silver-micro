const jwt = require('jsonwebtoken');

const auth = {
    generateToken:
        (user) => {       
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: 86400 });
            return token;
        },
}

module.exports = auth;
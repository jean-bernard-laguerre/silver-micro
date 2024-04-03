const jwt = require('jsonwebtoken');
const cookie = require('cookie'); 

const authMiddleware = (req, res, next) => {
    // get the token from request cookies
    const token = cookie.parse(req.headers.cookie).token;
    
    // if token is not present, return 401
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        // if token is verified, set the user in request object
        req.user = user;
    });

    next();
};

module.exports = authMiddleware;

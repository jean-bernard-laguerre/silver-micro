const Responsable = require('../v1/models/responsableModel');

const userRole = require('../config').role;

const adminMiddleware = (allowedRole = "any") => {
    return async (req, res, next) => {
        // from the previous middleware, the user is set in request object
        const user = req.user;

        // check if the user role is admin
        if (user.role !== userRole.admin) {
            return res.status(403).json({ message: 'Admin role required' });
        }

        // check the user role in the restaurant of the request
        const responsable = await Responsable.findOne({ where: { UserId: user.id, RestaurantId: req.body.restaurantId } });

        // if the user has no role in the restaurant, return 403
        if (!responsable) {
            return res.status(403).json({ message: 'Restaurant access forbidden' });
        }

        console.log(responsable);
        // if allowedRole is not any, check if the user role is allowed
        if (allowedRole !== "any" && responsable.role !== allowedRole) {
            return res.status(403).json({ message: 'Unauthorized role' });
        }

        next();
    }
}

module.exports = adminMiddleware;
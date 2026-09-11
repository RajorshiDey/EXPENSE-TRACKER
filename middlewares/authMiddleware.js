const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing"
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    } catch (error) {
        console.error("AUTH MIDDLEWARE ERROR:", error);
        return res.status(401).json({
            success: false,
            message: "Not authorized, token invalid"
        });
    }
}

module.exports = {
    protect
};
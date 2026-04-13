const jwt = require('jsonwebtoken');

//  Verify Token
const verifyToken = (req, res, next) => {
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        console.log("Decoded user:", decoded); // debug

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};

//  Role Check (same file me)
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "No role found" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: Access denied" });
        }

        next();
    };
};

module.exports = {
    verifyToken,
    authorizeRoles
};
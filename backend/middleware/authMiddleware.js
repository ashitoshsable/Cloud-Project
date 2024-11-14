const jwt = require('jsonwebtoken');
const JWT_SECRET = 'CloudProject';

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'Access Denied: No token provided' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = { id: verified.id }; 
        
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;

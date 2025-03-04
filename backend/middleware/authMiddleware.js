const { validateToken } = require('../config/jwt');

const authMiddleware = (req, res, next) =>
{
    const token = req.header("Authorization");
    if(!token)
    {
        return res.status(401).json({ "message": "Access Denied" });
    }
    try
    {
        const verified = validateToken(token.replace("Bearer ", ""));
        req.user = verified;
        next();
    }
    catch(error)
    {
        return res.status(403).json({ "message": "Unauthorized" });
    }
};

module.exports = authMiddleware;
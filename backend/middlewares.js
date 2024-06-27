const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({
            message: "error at position 1"
        });
    }

    const jwtList = authHeader.split(' ');
    const jwtToken = jwtList[1];
    try {
        const decoded = jwt.verify(jwtToken, JWT_SECRET);
        if(decoded.userId) {
            req.userId = decoded.userId;
            next();
        }
        else {
            return res.status(403).json({
                message: "error at position 2"
            });
        }
    } 
    catch (err) {
        return res.status(403).json({
            message: "error at position 3"
        });
    }
}

module.exports = {
    authMiddleware
}

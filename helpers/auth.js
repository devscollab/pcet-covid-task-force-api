const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        next()
    } catch {
        res.json({
            status: 401,
            message: 'Invalid request!'
        });
    }
};
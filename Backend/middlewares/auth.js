const jwt = require('jsonwebtoken');
//const { models } = require('mongoose');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(err) {
        res.status(403).json({error: 'Unauthorized request'})
    }
};

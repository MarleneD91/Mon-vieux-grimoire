const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        //console.log (req.auth.userId);//ERROR AXIOS !
        next();
    } catch(err) {
        res.status(403).json({error: 'Unauthorized request'})
    }
};
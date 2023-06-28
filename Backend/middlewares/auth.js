const jwt = require('jsonwebtoken');

//Environmental variables 
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // client token = Bearer + token (2nd elmt)
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET); 
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(err) {
        res.status(403).json({error: 'Unauthorized request'})
    }
};
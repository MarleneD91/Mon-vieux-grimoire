const rateLimit = require('express-rate-limit');

const createAccountLimiter = (req, res, next) => {
    rateLimit({
        windowMs: 30 * 60 * 1000, // 30min
        max: 5, // Limit each IP to 5 create account requests per `window` (here, per half hour)
        message:
            'Too many connexion &/or account creation tenants from this IP, please try again after half an hour',
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
    next();
}

module.exports = createAccountLimiter;
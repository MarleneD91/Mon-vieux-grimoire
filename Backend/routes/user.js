/**********************ROUTER FILE**********************/ 

const express = require ('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const accountRateLimiter = require('../middlewares/signup-login-account-limiter');

//POST Routes
router.post('/signup', accountRateLimiter, userCtrl.signup);
router.post('/login', accountRateLimiter, userCtrl.login);

module.exports = router;
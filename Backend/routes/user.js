/**********************ROUTER FILE**********************/ 

const express = require ('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//Middlewares
const accountRateLimiter = require('../middlewares/signup-login-account-limiter');
const passwordValidator = require('../middlewares/password-validator');

//POST Routes
router.post('/signup', passwordValidator, accountRateLimiter, userCtrl.signup);
router.post('/login', passwordValidator, accountRateLimiter, userCtrl.login);

module.exports = router;
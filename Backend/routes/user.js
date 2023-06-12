/**********************ROUTER FILE**********************/ 

const express = require ('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//Add body-parser in order to read the req body (for POST/PUT req)
const bodyParser = require('body-parser')
//create application/json parser
const jsonParser = bodyParser.json()

//POST Routes
router.post('/signup', jsonParser, userCtrl.signup);
router.post('/login', jsonParser, userCtrl.login);

module.exports = router;
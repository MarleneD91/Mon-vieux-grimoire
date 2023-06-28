/**********************CONTROLLER**********************/ 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//Environmental variables 
require('dotenv').config();


// Create a new account
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message:'Utilisateur créé!'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

// Log in
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({message: 'Identifiant et/ou mot de passe incorrect(s).'})
            };
            bcrypt.compare(req.body.password, user.password)
                .then(same => {
                    if(!same) {
                        return res.status(401).json({message: 'Identifiant et/ou mot de passe incorrect(s).'})
                    };
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.RANDOM_TOKEN_SECRET,
                            {expiresIn: '1h'}
                        )});
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

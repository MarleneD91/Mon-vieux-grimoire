const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true} // !! il faut sans doute un mot de passe avec un sécurité (caractères spéciaux, etc.)
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
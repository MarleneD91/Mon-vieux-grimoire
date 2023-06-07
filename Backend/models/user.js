const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {type: String, required: true}, // !! Adresse unique à préciser
    password: {type: String, required: true} // !! il faut sans doute un mot de passe avec un sécurité (caractères spéciaux, etc.)
});

module.exports = mongoose.model('User', userSchema);
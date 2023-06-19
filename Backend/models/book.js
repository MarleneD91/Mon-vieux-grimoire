/**********************MODEL**********************/ 

const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    author : {type: String, required: true},
    imageUrl: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    ratings: [{
        userId: {type: String, required: true},
        grade: {type: Number, min: 0, max: 5}, // Faire en sorte que la notation soit conforme à un modèle ?
    }],
    averageRating: {type: Number}
});

module.exports = mongoose.model('Book', bookSchema);
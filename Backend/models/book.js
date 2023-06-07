const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    author : {type: String, required: true},
    year: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    genre: {type: String, required: true},
    ratings: [{
        userId: {type: String, required: true},
        grade: {type: Number, required: true} // Faire en sorte que la notation soit conforme à un modèle ?
    }],
    averageRating: {type: Number, required: true}
});

module.exports = mongoose.model('Book', bookSchema);


/*BookItem.propTypes = {
    size: PropTypes.number.isRequired,
    book: PropTypes.shape({
      id: PropTypes.string,
      userId: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      year: PropTypes.number,
      imageUrl: PropTypes.string,
      genre: PropTypes.string,
      ratings: PropTypes.arrayOf(PropTypes.shape({
        userId: PropTypes.string,
        grade: PropTypes.number,
      })),
      averageRating: PropTypes.number,
    }).isRequired,
  };*/
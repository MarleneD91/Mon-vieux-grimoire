/**********************ROUTER FILE**********************/ 

const express = require ('express');
const auth = require('../middlewares/auth');

const router = express.Router();

const bookCtrl = require('../controllers/book');


// get one book by id
router.get('/:id', bookCtrl.readOneBook);
// get all books
router.get('/', bookCtrl.readAllBook);

//+best rating route missing GET
router.get('/bestrating', bookCtrl.readBookRating);

// AUTH REQUIRED FOR THE FOLLOWING ROUTES (need to be created):
// Create a new book  
router.post('/', auth, bookCtrl.createBook);
// Update book info
router.put('/:id', auth, bookCtrl.updateBook);
// Delete book by id
router.delete('/:id', auth, bookCtrl.deleteBook);
// Create a rating for an identified book
router.post('/:id/rating', auth, bookCtrl.createBookRating);

module.exports = router;
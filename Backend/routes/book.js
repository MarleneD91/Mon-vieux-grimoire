/**********************ROUTER FILE**********************/ 

const express = require ('express');
const router = express.Router();

//Middlewares
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const resizeImg = require('../middlewares/resizeImg');//Img resizing middleware (using sharp)

//Controllers
const bookCtrl = require('../controllers/book');



//get all books
router.get('/', bookCtrl.readAllBook);
//get best rated books, 3
router.get('/bestrating', bookCtrl.bestRatedBooks);
//get one book by id
router.get('/:id', bookCtrl.readOneBook);

// AUTH REQUIRED FOR THE FOLLOWING ROUTES (need to be created):
// Create a new book  
router.post('/', auth, multer, resizeImg, bookCtrl.createBook);
// Create a rating for an identified book
router.post('/:id/rating', auth, bookCtrl.createBookRating);
// Update book info
router.put('/:id', auth, multer, resizeImg, bookCtrl.updateBook);
// Delete book by id
router.delete('/:id', auth, bookCtrl.deleteBook);







module.exports = router;
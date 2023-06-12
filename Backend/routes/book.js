/**********************ROUTER FILE**********************/ 

const express = require ('express');

//Middlewares
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const router = express.Router();

//Controllers
const bookCtrl = require('../controllers/book');

/*//Add body-parser in order to read the req body (for POST/PUT req)
const bodyParser = require('body-parser')
//Create application/json parser
const jsonParser = bodyParser.json()
*/

// get one book by id
router.get('/:id', bookCtrl.readOneBook);
// get all books
router.get('/', bookCtrl.readAllBook);

//+best rating route missing GET
router.get('/bestrating', bookCtrl.readBookRating);

// AUTH REQUIRED FOR THE FOLLOWING ROUTES (need to be created):
// Create a new book  
router.post('/', /*jsonParser,*/ auth, multer, bookCtrl.createBook);
// Update book info
router.put('/:id', /*jsonParser,*/ auth, multer, bookCtrl.updateBook);
// Delete book by id
router.delete('/:id', auth, bookCtrl.deleteBook);
// Create a rating for an identified book
router.post('/:id/rating', /*jsonParser,*/ auth, bookCtrl.createBookRating);

module.exports = router;
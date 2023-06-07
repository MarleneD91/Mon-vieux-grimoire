/**********************ROUTER FILE**********************/ 

const express = require ('express');

const router = express.Router();

const bookCtrl = require('../controllers/book');
const book = require('../models/book');

// get one book by id
router.get('/:id', bookCtrl.readOneBook);
// get all books
router.get('/', bookCtrl.readAllBook);
 
//POST a new book - ! auth. required 
router.post('/', bookCtrl.createBook);

// Change book info - ! auth. required!
router.put('/:id', bookCtrl.updateBook);

//+best rating route missing GET
router.get('/bestrating', bookCtrl.readBookRating);

// AUTH REQUIRED FOR THE FOLLOWING ROUTES (need to be created):
//+delete book by id missing DELETE 
router.delete('/:id', bookCtrl.deleteBook);
//+rating book missing POST

module.exports = router;
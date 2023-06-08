/**********************CONTROLLER FILE**********************/ 

const Book = require('../models/book');

//C-R-U-D controllers naming : for better comprehension

// POST route ctrl
exports.createBook = (req,res, next) => {
    //delete req.body._id;
    
    const book = new Book ({ // create a new book instance
        /*userId: req.auth.userId,
        image: req.body.image,
        averageRating: 2, *///WORK ON IT LATER
        ...req.body, // spread operator: used to copy all req.body elements
     
    });
    book.save() // save the new book element in db - returns a Promise
        .then(() => res.status(201).json({message:"Livre enregistré !"})) // Send succes res
        .catch(error => res.status(400).json({error})); // Send error res  
};

//PUT route ctrl
exports.updateBook = (req, res, next) => {
    Book.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then (() => res.status(200).json({message: "Livre modifié!"}))
        .catch (error => res.status(400).json({error}));   
};

//DELETE route ctrl
exports.deleteBook = (req, res, next) => {
    Book.deleteOne({_id: req.pamas.id})
    .then(() => res.status(200).json({message:'Livre supprimé!'}))
    .catch(() => res.status(400).json({error}))
};

//GET one book ctrl
exports.readOneBook = (req, res, next) => {
    Book.findOne ({_id: req.params.id})
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({error}));
};
//GET all books
exports.readAllBook = (req,res,next) => {
    Book.find() // returns a Promise
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({error}));
};

//GET Rating for one book
exports.readBookRating = (req, res, next) => {
    Book.findOne({_id: req.params.id})
        .then(book => res.status(200).json(/* fonction to find and send the 3 best rated books in an array */))
        .catch(error => res.status(400).json({error}))
}

//POST rating for one book
exports.createBookRating = (req, res, next) => {
    //work on it ! needs auth too.
}

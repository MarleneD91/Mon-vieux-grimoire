/**********************CONTROLLER FILE**********************/ 

//const resizeImg = require('../middlewares/resizeImg');
const Book = require('../models/book');
const fs = require('fs');

//C-R-U-D controllers naming : for better comprehension

// POST route ctrl
exports.createBook = (req,res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    console.log(req.auth.userId)

    const book = new Book ({ // create a new book instance
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/resized-${req.file.filename.replace(/\.[^.]*$/,'')}.webp`,
        ratings :{
            userId: req.auth.userId,
            grade: bookObject.ratings[0].grade
        },
        averageRating: bookObject.ratings[0].grade
    });

    book.save() // save the new book element in db - returns a Promise
        .then(() => res.status(201).json({message:"Livre enregistré !"})) // Send succes res
        .catch(error => res.status(400).json({error})); // Send error res  
};

//PUT route ctrl
exports.updateBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/resized-${req.file.filename.replace(/\.[^.]*$/,'')}.webp`
    } : { ...req.body };
    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then(book => {
            console.log("Hello");
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Book.updateOne({_id: req.params.id}, {...bookObject, _id: req.params.id})
                    .then (() => res.status(200).json({message: "Livre modifié!"}))
                    .catch (error => res.status(400).json({error}));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//DELETE route ctrl
exports.deleteBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({message: 'Not authorized'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(404).json({ error });
        });
};

//GET one book ctrl
exports.readOneBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({error}));
};
//GET all books
exports.readAllBook = (req,res,next) => {
    Book.find() // returns a Promise
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({error}));
};

//GET Best rated Books
exports.bestRatedBooks = (req, res, next) => {
    Book.find()
        .sort({averageRating: -1})
        .limit(3)
        .then( books => res.status(200).json(books))
        .catch(error => res.status(400).json({error}))
}

//POST rating for one book
exports.createBookRating = (req, res, next) => {
 
    Book.findOne({_id: req.params.id})
        .then(book => {

            //Get all users that have rated the selected book
            const bookRatings = book.ratings; // rating array of selected book
            
            const ratingUsers = bookRatings.map(ratings => ratings.userId); // array of users who already rated the book 

            //then find if the current user has already rated the selected book
            if(ratingUsers.includes(req.auth.userId)){
                res.status(401).json({message: 'Vous avez déjà noté ce livre!'}); 
            } else {
                //Define the function to calculate the new ratings average
                const calcAverage = (array) => {
                    let ratingsSum = 0;
                    let newAverageRating = 0;
                    for (i=0 ; i < array.length; i+1){
                    ratingsSum += array[i];
                    newAverageRating = (ratingsSum / allRatings.length).toFixed(1) ;
                }};
                //add the new rating to the rating array of the selected book
                const newRating = ({userId: req.auth.userId, grade: req.body.rating});
                bookRatings.push(newRating);
                console.log(bookRatings);
                //Apply the function to get new ratings average                
                const allRatings = bookRatings.map(ratings => ratings.grade);
                const newAverageRating = calcAverage(allRatings);
                     

            Book.updateOne({_id: req.params.id},{ratings: bookRatings, averageRating: newAverageRating, _id: req.params.id})
                .then (() => res.status(201).json({message: "Note ajoutée!"}))
                .catch (error => res.status(400).json({error}));
            }})
        .catch (error => res.status(400).json({error}))
}

const express = require('express'); // import express
const app = express(); // create app
const mongoose = require('mongoose'); // to connect w/ Mongodb easily

//Import routes
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');
//Path access
const path = require('path');
//Environmental variables 
require('dotenv').config();

// Connect API to db
mongoose.connect("mongodb+srv://" 
  + process.env.DB_USER_NAME
  + ":" + process.env.DB_PASSWORD
  +"@" + process.env.DB_NAME 
  + "/?retryWrites=true&w=majority",
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Extract body req as JSON elements
app.use(express.json());

// CORS - Add headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Handle routes
app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
//Handle image path
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app; // export app - access from other files
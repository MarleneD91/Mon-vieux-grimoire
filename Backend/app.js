const express = require('express'); // import express
const app = express(); // create app

const mongoose = require('mongoose'); // to connect w/ Mongodb easily

// Import routes
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

// Connect API to db
mongoose.connect('mongodb+srv://Admin:<password>@cluster-vieux-grimoire.u07jbtp.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Add body-parser in order to read the req body (for POST/PUT req)
const bodyParser = require('body-parser');
//Create application/json parser
const jsonParser = bodyParser.json();

// CORS - Add headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/books', jsonParser, bookRoutes);
app.use('/api/auth', jsonParser, userRoutes);

module.exports = app; // export app - access from other files
  
// * QUESTION MENTORAT : L'ordre a-t-il une importance ? (ici const app est en début de fichier, dans le cours c'est après la connexion mongoose)

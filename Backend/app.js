const express = require('express'); // import express
const app = express(); // create app
const mongoose = require('mongoose'); // to connect w/ Mongodb easily

// Helmet can help protect app from some well-known web vulnerabilities by setting HTTP headers appropriately
// = collection of several smaller middleware functions that set security-related HTTP response headers
const helmet = require('helmet');
// Express middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection
const mongoSanitize = require('express-mongo-sanitize');

//Import routes
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');
//Path access
const path = require('path');
//Environmental variables 
require('dotenv').config();

//Rate Limit : Limit number of requests for a set time
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 50, // Limit each IP to 50 req. per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

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

// Add headers to res objects - comm° (b) origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Add helmet & mongo-sanitize (SECURITY modules)
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } })); //Prevent Helmet from setting the Cross-Origin-Embedder-Policy header - in order to get the images!
app.use(mongoSanitize());
//Apply the rate limiting middleware to all requests
app.use(limiter);

//Handle routes
app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
//Handle image path
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app; // export app - access from other files
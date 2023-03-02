/* ====== External Modules  ====== */
// Required External Modules
// all required code that is not our own

const express = require('express');
const session = require("express-session");
const passport = require('passport');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const bodyParser = require('body-parser')
const multer = require('multer');
const path = require('path');
const config = require("@savvydeco/config")



/* ====== Internal Modules  ====== */
// Required Internal Modules
// all code that is our code
 

/* ====== Instanced Module  ====== */
// Create the Express app
const app = express();
// returns an object that is our server

//enabling ejs 
app.set('view engine', 'ejs');


//connect mongoDB with mongoose
require("./config/database");
const userDb = require('./models/user');
//require passport
require("./config/passport");


/* ====== Routes  ====== */
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');

	
/* ====== Middleware  ====== */ 
// //(app.use)

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


// method override Middleware

app.use(
    session({
      secret: "letsgoproject2!",
      resave: false,
      saveUninitialized: true,
    })
  );


//Add passport middleware here
app.use(passport.initialize());
app.use(passport.session());


app.use('/', productRoutes);
app.use('/api', indexRoutes);
app.use('/', userRoutes);
app.use('/', cartRoutes);

// favicon error 
app.get('/favicon.ico', function(req,res){
  res.send("404");
})


/* ====== System Variables  ====== */
const PORT = process.env.PORT || 4000; // full caps signify a config variable

/* ====== App Configuration  ====== */
// app.set

/* ====== Server bind  ====== */

// provide environment details
// bind the application to the port via app.listen(number, optional function to do after bind)
(process.env.NODE_ENV === 'production') ? process.env.GOOGLE_CALLBACK : process.env.LOCAL_CALLBACK

// update status console log to indicate current env
let status;
(process.env.NODE_ENV === 'production') ? status = "⚠️  PRODUCTION ⚠️ " : status = "dev 🤖" 


app.listen(config.PORT, ()=>{console.log(`This app is live on port ${config.PORT}`)})
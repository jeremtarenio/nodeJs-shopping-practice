// ====================
// DEPENDENCIES
// ====================

const express = require("express");
const app = express();

const path = require("path");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ //allows access to req.body
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public'))); //allows public access to css files

// ====================
// ROUTES
// ====================

const sellerRoutes = require('./routes/seller.js');
app.use('/seller', sellerRoutes); //every seller routes will start with /seller/

const shopRoutes = require('./routes/shop.js'); //contains the variable router from shop.js
app.use(shopRoutes);

//404 page
const errorController = require('./controllers/error.js');
app.use(errorController.get404);

// ====================
// SERVER
// ====================

app.listen(69, function () {
    console.log("Server initialized.");
});
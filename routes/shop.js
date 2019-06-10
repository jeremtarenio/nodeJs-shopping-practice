const express = require("express");
const router = express.Router();

const path = require("path");

const shopController = require('../controllers/shop.js');

router.get('/', shopController.getHomePage);

router.get('/shop', shopController.getProducts); //product list

router.get('/products/:productId', shopController.getProduct); //product details

router.get('/cart', shopController.getCartPage); //cart page
router.post('/cart', shopController.postAddToCart); //add to cart
router.post('/cart-delete-item', shopController.postCartDeleteItem);

router.get('/checkout', shopController.getCheckout); 

router.get('/orders', shopController.getOrders);

//module.exports contains {return : ''}
module.exports = router; //module.exports now contains {return: router}
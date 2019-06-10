const express = require("express");
const router = express.Router();

const path = require("path");

const sellerController = require('../controllers/seller.js');

router.get('/add-product', sellerController.getAddProduct);
router.post('/add-product', sellerController.postAddProduct);

router.get('/product-list', sellerController.getSellerProducts); //list seller product

router.get('/edit-product/:productId', sellerController.getEditProduct);
router.post('/edit-product', sellerController.postEditProduct);

router.post('/delete-product', sellerController.postDeleteProduct);
module.exports = router;

/* exports vs module.exports
exports.fooA = fooB, will allow fooA to be accessed by other modules using the name fooB 
module.exports = foo, requiring this module will return foo, foo is a variable inside the module

try console.log() and see what each object contains
*/

//products.js contains all the logic/algorithm related to products
const Product = require('../models/products');
const products = Product.fetchAll(); //from the products model

//const Cart = require('../models/cart');

// ====================
// SELLER
// ====================

//add product page - get
exports.getAddProduct = (req, res, next) => {
    res.render('seller/edit-product.ejs', {
        pageTitle: 'Add Product',
        path: '/seller/add-product',
        role: 'seller',
        editing: 'false'
    });
}

//add product page - post
exports.postAddProduct = (req, res, next) => {
    var id = (Math.floor(Math.random() * 1000000) + 1).toString();
    var title = req.body.title;
    var imgUrl = req.body.imgUrl;
    var desc = req.body.desc;
    var price = req.body.price;
    
    const product = new Product(id, title, imgUrl, desc, price);
    product.save();

    console.log(product.title + " added.");
    res.redirect('/seller/product-list');
};

exports.getSellerProducts = (req, res, next) => {
    const products = Product.fetchAll(); //from the products model
    res.render('seller/product-list.ejs', {
        prods: products,
        pageTitle: 'Product List',
        path: '/seller/product-list',
        role: 'seller'
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const productId = req.params.productId;
    const product = products.find(prod => prod.id === productId); //hook an object from the array using an id

    if (product) {
        res.render('seller/edit-product.ejs', {
            product: product,
            pageTitle: 'Edit Product',
            path: '/seller/add-product',
            role: 'seller',
            editing: editMode,
            product: product
        });
    }
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedImgUrl = req.body.imgUrl;
    const updatedDesc = req.body.desc;
    const updatedPrice = req.body.price;

    let product = new Product(productId, updatedTitle, updatedImgUrl, updatedDesc, updatedPrice);

    product.save();
    res.redirect('/seller/product-list');
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.id;

    Product.deleteById(productId);
    //Cart.calculateTotalPrice();
    res.redirect('/seller/product-list');

};



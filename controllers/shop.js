// ====================
// MODELS
// ====================

const Product = require('../models/products'); //product model
const products = Product.fetchAll(); //from the products model

const Cart = require('../models/cart');
const cartProducts = Cart.fetchProducts();
const entireCart = Cart.fetchCart();


// ====================
// PRODUCTS
// ====================

exports.getProducts = (req, res, next) => {
    res.render('shop/product-list.ejs', {
        products: products,
        pageTitle: 'Product List',
        path: '/shop',
        role: 'buyer'
    });
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    const product = products.find(prod => prod.id === productId); //hook an object from the array using an id
    res.render('shop/product-details.ejs', {
        path: '/shop',
        pageTitle: 'Product Details Page',
        role: 'buyer',
        product: product
    });
};

// ====================
// HOMEPAGE
// ====================

exports.getHomePage = (req, res, next) => {
    res.render('index.ejs', {
        path: '/',
        pageTitle: 'Bayong.ph',
        role: 'buyer'
    });
};

// ====================
// CART
// ====================

exports.getCartPage = (req, res, next) => {
    var convertedCart = [];
    
    for (var i = 0; i < cartProducts.length; i++) { //convert the ids into complete product object
        var product = products.find(prod => prod.id === cartProducts[i].id);

        if (product) {
            product.qty = cartProducts[i].qty;
            convertedCart.push(product);
        }
    }

    res.render('shop/cart.ejs', {
        path: '/cart',
        pageTitle: 'Shopping Cart',
        role: 'buyer',
        convertedCart: convertedCart,
        cart: entireCart
    });
};

exports.postAddToCart = (req, res, next) => {
    const productId = req.body.productId;
    const product = products.find(prod => prod.id === productId); //hook an object from the array using an id
    Cart.addProduct(product.id, product.price);
    res.redirect('/shop');
};

exports.postCartDeleteItem = (req, res, next) => {
    const productId = req.body.productId;
    Cart.deleteCartItemById(productId);
    res.redirect('/cart');
};

// ====================
// CHECKOUT PAGE
// ====================

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout.ejs', {
        path: '/checkout',
        pageTitle: 'Checkout',
        role: 'buyer'
    });
};

// ====================
// GET ORDERS PAGE
// ====================

exports.getOrders = (req, res, next) => {
    res.render('shop/orders.ejs', {
        path: '/orders',
        pageTitle: 'Orders',
        role: 'buyer'
    });
};
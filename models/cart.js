let cart = {
    products: [],
    totalPrice: 0
}

const Product = require('../models/products'); //product model
const products = Product.fetchAll();

const calculateTotalPrice = () => {
    let convertedCart = [];

    for (let i = 0; i < cart.products.length; i++) {
        var product = products.find(prod => prod.id === cart.products[i].id);

        if (product) {
            product.qty = cart.products[i].qty;
            convertedCart.push(product);
        }

    }

    let totalPrice = 0;

    for (let i = 0; i < convertedCart.length; i++) {
        totalPrice = totalPrice + parseInt(convertedCart[i].price * convertedCart[i].qty);
    }

    cart.totalPrice = totalPrice;
}

module.exports = class Cart {

    static addProduct(productId, productPrice) {
        //analyze the state of the cart
        const existingProduct = cart.products.find(prod => prod.id === productId); //hook an object from the array using an id
        const indexOfExistingProduct = cart.products.indexOf(existingProduct); //to identify what element to replace
        let product;

        if (existingProduct) { //if added product is existing, increase quantity
            console.log("Product exists...")
            product = { ...existingProduct
            }; //copy the whole object
            product.qty = product.qty + 1;

            cart.products[indexOfExistingProduct] = product; //replace
        } else { //else, add new product
            console.log("New product detected...")
            product = {
                id: productId,
                qty: 1
            };

            cart.products.push(product);
        }

        calculateTotalPrice();
    }

    static deleteCartItemById(id) {
        const itemIndex = cart.products.findIndex(prod => prod.id === id);
        
        cart.products.splice(itemIndex, 1);
        calculateTotalPrice();
    }

    static calculateTotalPrice() {
        calculateTotalPrice();
    }

    static fetchProducts() {
        return cart.products;
    }

    static fetchCart() {
        return cart;
    }

}
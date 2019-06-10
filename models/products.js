const products = [{
    title: 'Carrots 1kg',
    imgUrl: 'https://marketplace.canva.com/MACV-uU0568/1/screen/canva-carrots%2C-vegetables%2C-market%2C-agricultural%2C-cultivate-MACV-uU0568.jpg',
    desc: 'She packed her seven versalia, put her initial into the',
    price: '49',
    id: '522460'
}, {
    title: 'Cabbage 1kg',
    imgUrl: 'https://marketplace.canva.com/MAC1K15XU0M/1/screen/canva-kohl%2C-cabbage%2C-green%2C-vegetables%2C-vegetable-patch%2C-food-MAC1K15XU0M.jpg',
    desc: 'She packed her seven versalia, put her initial into the',
    price: '99',
    id: '876437'
}];

module.exports = class Product {
    constructor(id, title, imgUrl, desc, price) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.desc = desc;
        this.price = price;
    }

    save() {
        const existingProduct = products.find(prod => prod.id === this.id); //hook an object from the array using an id
        const indexOfExistingProduct = products.indexOf(existingProduct); //to identify what element to replace

        if (existingProduct) {
            products[indexOfExistingProduct] = { ...this
            };
        } else {
            products.push(this);
        }
    }

    static fetchAll() { //static methods can be called without creating a new instance of the class
        return products;
    }

    static deleteById(id) {
        const Cart = require('../models/cart');
        const product = products.find(prod => prod.id === id);
        const productIndex = products.indexOf(product);

        products.splice(productIndex, 1);
        Cart.calculateTotalPrice();
    }

}
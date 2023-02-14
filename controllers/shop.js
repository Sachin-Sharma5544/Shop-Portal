//Core Module imports
const path = require("path");

//Variable Declarations
const VIEWS_NAME = "views";
const SHOP_PRODUCTS_FILE = "shop-products";
const SHOP_DETAILS_FILE = "shop-details";
const SHOP_CART_FILE = "cart";
const SHOP_ORDERS_FILE = "orders";
const SHOP_FOLDER = "shop";

const products = [1, 2, 3, 4, 5, 6, 7];

//details page
exports.getShopDetails = (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, SHOP_FOLDER, SHOP_DETAILS_FILE),
        { pageTitle: "Shop Products", products: products }
    );
};

//products page
exports.getShopProducts = (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, SHOP_FOLDER, SHOP_PRODUCTS_FILE),
        { pageTitle: "Shop Products", products: products }
    );
};

//cart page
exports.getCart = (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, SHOP_FOLDER, SHOP_CART_FILE)
    );
};

//orders page
exports.getOrders = (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, SHOP_FOLDER, SHOP_ORDERS_FILE)
    );
};

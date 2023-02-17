//Core Module imports
const path = require("path");

//Project import
const Product = require("../models/product");

//Variable Declarations
const VIEWS_NAME = "views";
const SHOP_PRODUCTS_FILE = "shop-products";
const SHOP_DETAILS_FILE = "shop-details";
const SHOP_CART_FILE = "cart";
const SHOP_ORDERS_FILE = "orders";
const SHOP_PRODUCT_DETAIL_FILE = "shop-productdetail";
const SHOP_FOLDER = "shop";

//details page
exports.getShopDetails = (req, res, next) => {
    Product.find({})
        .then((products) => {
            res.render(
                path.join(
                    __dirname,
                    "..",
                    VIEWS_NAME,
                    SHOP_FOLDER,
                    SHOP_DETAILS_FILE
                ),
                { pageTitle: "Shop Products", products: products }
            );
        })
        .then((err) => console.log(err));
};

//products page
exports.getShopProducts = (req, res, next) => {
    Product.find({})
        .then((products) => {
            res.render(
                path.join(
                    __dirname,
                    "..",
                    VIEWS_NAME,
                    SHOP_FOLDER,
                    SHOP_PRODUCTS_FILE
                ),
                { pageTitle: "Shop Products", products: products }
            );
        })
        .catch((err) => console.log(err));
};

//Product detail
exports.getShopProduct = (req, res, next) => {
    const { id } = req.params;
    Product.findOne({ _id: id })
        .then((product) => {
            res.render(
                path.join(
                    __dirname,
                    "..",
                    VIEWS_NAME,
                    SHOP_FOLDER,
                    SHOP_PRODUCT_DETAIL_FILE
                ),
                { pageTitle: "Shop Products", product: product }
            );
        })
        .catch((err) => console.log(err));
};

//cart page
exports.getCart = (req, res, next) => {
    let products = [1, 2, 3, 4, 5, 6, 7, 87];
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, SHOP_FOLDER, SHOP_CART_FILE),
        { pageTitle: "Cart Information", products: products }
    );
};

//orders page
exports.getOrders = (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, SHOP_FOLDER, SHOP_ORDERS_FILE)
    );
};

const path = require("path");
const express = require("express");
const router = express.Router();

const VIEWS_NAME = "views";
const SHOP_PRODUCTS_FILE = "shop-products";
const SHOP_DETAILS_FILE = "shop-details";
const SHOP_CART_FILE = "cart";
const SHOP_ORDERS_FILE = "orders";
const SHOP_FOLDER = "shop";

//details page
router.get("/", (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, SHOP_FOLDER, SHOP_DETAILS_FILE)
    );
});

//products page
router.get("/products", (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, SHOP_FOLDER, SHOP_PRODUCTS_FILE)
    );
});

//cart page
router.get("/cart", (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, SHOP_FOLDER, SHOP_CART_FILE)
    );
});

//orders page
router.get("/orders", (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, SHOP_FOLDER, SHOP_ORDERS_FILE)
    );
});

module.exports = router;

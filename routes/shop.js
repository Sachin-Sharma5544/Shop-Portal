const path = require("path");
const express = require("express");
const router = express.Router();

const VIEWS_NAME = "views";
const SHOP_PRODUCTS_FILE = "shop-products";
const SHOP_FOLDER = "shop";

router.get("/products", (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, SHOP_FOLDER, SHOP_PRODUCTS_FILE)
    );
});

module.exports = router;

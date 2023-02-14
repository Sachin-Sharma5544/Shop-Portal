const path = require("path");
const express = require("express");
const router = express.Router();

const VIEWS_NAME = "views";
const ADMIN_PRODUCTS_FILE = "admin-products";
const ADMIN_FOLDER = "admin";
const ADMIN_ADDPRODUCT_FILE = "admin-addproduct";

const products = [1, 2, 3, 4, 5, 6];

//products
router.get("/products", (req, res, next) => {
    res.render(
        path.join(
            __dirname,
            "..",
            VIEWS_NAME,
            ADMIN_FOLDER,
            ADMIN_PRODUCTS_FILE
        ),
        { pageTitle: "Admin Products", products: products }
    );
});

//Add Product
router.get("/addproduct", (req, res, next) => {
    res.render(
        path.join(
            __dirname,
            "..",
            VIEWS_NAME,
            ADMIN_FOLDER,
            ADMIN_ADDPRODUCT_FILE
        ),
        { pageTitle: "Add Product" }
    );
});

module.exports = router;

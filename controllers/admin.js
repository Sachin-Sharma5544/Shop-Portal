//Core Module imports
const path = require("path");

//Variable Declarations
const VIEWS_NAME = "views";
const ADMIN_PRODUCTS_FILE = "admin-products";
const ADMIN_FOLDER = "admin";
const ADMIN_ADDPRODUCT_FILE = "admin-addproduct";

const products = [1, 2, 3, 4, 5, 6];

//products
exports.getProducts = (req, res, next) => {
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
};

//Add Product
exports.addProduct = (req, res, next) => {
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
};

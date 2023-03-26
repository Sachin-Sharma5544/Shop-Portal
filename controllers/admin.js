//Core Module imports
const path = require("path");

//Project import
const Product = require("../models/product");

//Variable Declarations
const VIEWS_NAME = "views";
const ADMIN_PRODUCTS_FILE = "admin-products";
const ADMIN_FOLDER = "admin";
const ADMIN_ADDPRODUCT_FILE = "admin-addproduct";
const ADMIN_UPDATE_PRODUCT_FILE = "admin-updateproduct";

//products
exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => products)
        .then((products) => {
            res.render(
                path.join(
                    __dirname,
                    "..",
                    VIEWS_NAME,
                    ADMIN_FOLDER,
                    ADMIN_PRODUCTS_FILE
                ),
                {
                    pageTitle: "Admin Products",
                    products: products,
                }
            );
        })
        .catch((err) => console.log(err));
};

//--------------------------------------------------------------------------------------------

//Add  Product
exports.getAddProduct = (req, res, next) => {
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

exports.postAddProduct = (req, res, next) => {
    const { title, price, description } = req.body;
    const image = req.file;
    console.log(image);
    // const product = new Product({ title, price, imageurl: image, description });
    // product
    //     .save()
    //     .then(() => {
    //         res.redirect("/admin/products");
    //     })
    //     .catch((err) => console.log(err));
};

//--------------------------------------------------------------------------------------------

//Update Product
exports.getUpdateProduct = (req, res, next) => {
    const { id } = req.params;
    Product.findOne({ _id: id })
        .then((product) => {
            res.render(
                path.join(
                    __dirname,
                    "..",
                    VIEWS_NAME,
                    ADMIN_FOLDER,
                    ADMIN_UPDATE_PRODUCT_FILE
                ),
                { pageTitle: "Update Product", product: product }
            );
        })
        .catch((err) => console.log(err));
};

exports.postUpdateProduct = (req, res, next) => {
    const { id, title, imageurl, description, price } = req.body;
    Product.findByIdAndUpdate(
        { _id: id },
        { $set: { title, imageurl, description, price } }
    )
        .then(() => {
            res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
};

//--------------------------------------------------------------------------------------------

//Delete product
exports.getDeleteProduct = (req, res, next) => {
    const { id } = req.params;
    Product.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
};

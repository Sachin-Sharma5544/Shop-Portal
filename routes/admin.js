const express = require("express");
const router = express.Router();

//Middleware Import
const isAuth = require("../middleware/isAuth");

//Controller Imports
const adminController = require("../controllers/admin");

//products
router.get("/products", isAuth, adminController.getProducts);

//Add Product
router.get("/addproduct", isAuth, adminController.getAddProduct);
router.post("/addproduct", isAuth, adminController.postAddProduct);

//Update Product
router.get("/updateproduct/:id", isAuth, adminController.getUpdateProduct);
router.post("/updateproduct", isAuth, adminController.postUpdateProduct);

//Delete Product
router.get("/:id", isAuth, adminController.getDeleteProduct);

module.exports = router;

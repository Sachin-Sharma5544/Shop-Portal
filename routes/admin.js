const express = require("express");
const router = express.Router();

//Controller Imports
const adminController = require("../controllers/admin");

//products
router.get("/products", adminController.getProducts);

//Add Product
router.get("/addproduct", adminController.addProduct);

module.exports = router;

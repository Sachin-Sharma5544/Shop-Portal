const express = require("express");
const router = express.Router();

//Controller Imports
const adminController = require("../controllers/admin");

//products
router.get("/products", adminController.getProducts);

//Add Product
router.get("/addproduct", adminController.getAddProduct);
router.post("/addproduct", adminController.postAddProduct);

//Update Product
router.get("/updateproduct/:id", adminController.getUpdateProduct);
router.post("/updateproduct", adminController.postUpdateProduct);

//Delete Product
router.get("/:id", adminController.getDeleteProduct);

module.exports = router;

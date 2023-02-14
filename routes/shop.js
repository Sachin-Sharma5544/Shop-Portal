const express = require("express");
const router = express.Router();

//Controller Imports
const shopController = require("../controllers/shop");

//details page
router.get("/", shopController.getShopDetails);

//products page
router.get("/products", shopController.getShopProducts);

//cart page
router.get("/cart", shopController.getCart);

//orders page
router.get("/orders", shopController.getOrders);

module.exports = router;

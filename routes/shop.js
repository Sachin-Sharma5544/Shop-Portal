const express = require("express");
const router = express.Router();

//Middleware Import
const isAuth = require("../middleware/isAuth");

//Controller Imports
const shopController = require("../controllers/shop");

//details page
router.get("/", shopController.getShopDetails);

//products page
router.get("/products", shopController.getShopProducts);

//product detai
router.get("/product/:id", shopController.getShopProduct);

//cart page
router.get("/cart", isAuth, shopController.getCart);
router.post("/cart", isAuth, shopController.postCart);
router.post("/cart/delete", isAuth, shopController.postDeleteCart);
router.post("/cart/incQty", isAuth, shopController.postIncQtyCart);
router.post("/cart/decQty", isAuth, shopController.postDecQtyCart);

//orders page
router.get("/orders", isAuth, shopController.getOrders);

module.exports = router;

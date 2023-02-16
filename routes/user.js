const express = require("express");
const router = express.Router();

//Controller Imports
const userController = require("../controllers/user");

//login
router.get("/login", userController.getLogin);

//signup
router.get("/signup", userController.getSignup);
router.post("/signup", userController.postSignup);

//logout
router.get("/logout", userController.getLogout);

module.exports = router;

const path = require("path");

const express = require("express");
const router = express.Router();

const VIEWS_NAME = "views";
const USER_LOGIN_FILE = "login";
const USER_SIGNUP_FILE = "signup";
const AUTH_FOLDER = "auth";

//login
router.get("/login", (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, AUTH_FOLDER, USER_LOGIN_FILE),
        { pageTitle: "Login" }
    );
});

//signup
router.get("/signup", (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, AUTH_FOLDER, USER_SIGNUP_FILE),
        { pageTitle: "Signup" }
    );
});

//logout
router.get("/logout");

module.exports = router;

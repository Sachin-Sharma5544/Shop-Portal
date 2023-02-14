//Core Module imports
const path = require("path");

//Variable Declarations
const VIEWS_NAME = "views";
const USER_LOGIN_FILE = "login";
const USER_SIGNUP_FILE = "signup";
const AUTH_FOLDER = "auth";

//login
exports.getLogin = (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, AUTH_FOLDER, USER_LOGIN_FILE),
        { pageTitle: "Login" }
    );
};

//signup
exports.getSignup = (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, AUTH_FOLDER, USER_SIGNUP_FILE),
        { pageTitle: "Signup" }
    );
};

//logout
exports.getLogout = (req, res, next) => {
    console.log("logout clicked");
};

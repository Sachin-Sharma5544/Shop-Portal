//Core Module imports
const path = require("path");
const bcrypt = require("bcrypt");

//Project imports
const User = require("../models/user");

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

exports.postSignup = (req, res, next) => {
    console.log("user signup button clicked");
    const { username, email, password, confirmpassword } = req.body;

    User.findOne({ email: email })
        .then((user) => {
            if (user) {
                return res.redirect("/user/signup");
            }

            bcrypt
                .hash(password, 12)
                .then((hashPassword) => {
                    const newUser = new User({
                        username,
                        email,
                        password: hashPassword,
                    });
                    return newUser.save();
                })
                .then(() => {
                    res.redirect("/user/login");
                });
        })
        .catch((err) => console.log(err));
};

//logout
exports.getLogout = (req, res, next) => {
    console.log("logout clicked");
};

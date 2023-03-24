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

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then((user) => {
            // console.log(user);
            if (!user) {
                return res.redirect("/user/login");
            }

            bcrypt
                .compare(password, user.password)
                .then((doMatch) => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save((err) => {
                            res.redirect("/shop/products");
                        });
                    }
                    res.redirect("/user/login");
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};

//signup
exports.getSignup = (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, AUTH_FOLDER, USER_SIGNUP_FILE),
        { pageTitle: "Sign Up" }
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
                        cart: { items: [], cartTotalPrice: 0 },
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
    req.session.destroy((err) => {
        res.redirect("/user/login");
    });
};

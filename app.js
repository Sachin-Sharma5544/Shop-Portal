//core modules
const path = require("path");

// Third party package imports
const multer = require("multer");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();
const express = require("express");
const app = express();

//Project Imports
//a) Routes
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const userRoute = require("./routes/user");

//b) Database setup
const connectMongo = require("./database/database");

//c) Models
const User = require("./models/user");

//Variable Declarations
const VIEW_ENGINE = "view engine";
const TEMPLT_ENGINE = "ejs";
const VIEWS_NAME = "views";
const SERVER_START_MSG = "Server started & listening to port";
const PUBLIC_FOLDER_NAME = "public";
const ERROR_FILE_NAME = "404";

//Middlewares

const store = MongoDBStore({
    uri: process.env.MONGODB_CONNECT_URI,
    collection: "session",
});

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

app.set(VIEW_ENGINE, TEMPLT_ENGINE);
app.use(express.static(path.join(__dirname, PUBLIC_FOLDER_NAME)));
app.use(express.urlencoded({ extended: true }));
app.use(multer({ storage: fileStorage }).single("image"));
app.use(
    session({
        secret: "My Secret is this",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }

    User.findById(req.session.user._id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

//this middleware is registered for sending data to all the pages
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});

app.use("/admin", adminRoute);
app.use("/shop", shopRoute);
app.use("/user", userRoute);

app.use((req, res, next) => {
    res.render(path.join(__dirname, VIEWS_NAME, ERROR_FILE_NAME));
});

connectMongo().then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, () => {
        console.log(`${SERVER_START_MSG} ${process.env.PORT} `);
    });
});

// app.set(process.env.VIEW_ENGINE, process.env.TEMPLT_ENGINE);
// app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER_NAME)));

// app.get("/", (req, res, next) => {
//     res.render(
//         path.join(__dirname, process.env.VIEWS_NAME, process.env.TEST_FILE)
//     );
// });

// app.listen(process.env.PORT, () => {
//     console.log(`${process.env.SERVER_START_MSG} ${process.env.PORT} `);
// });

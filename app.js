//core modules
const path = require("path");

// Third party package imports
require("dotenv").config();
const express = require("express");
const app = express();

//Project Imports
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const userRoute = require("./routes/user");

//Variable Declarations
const VIEW_ENGINE = "view engine";
const TEMPLT_ENGINE = "ejs";
const VIEWS_NAME = "views";
const SERVER_START_MSG = "Server started & listening to port";
const PUBLIC_FOLDER_NAME = "public";
const ERROR_FILE_NAME = "404";

//Middlewares

app.set(VIEW_ENGINE, TEMPLT_ENGINE);
app.use(express.static(path.join(__dirname, PUBLIC_FOLDER_NAME)));
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoute);
app.use("/shop", shopRoute);
app.use("/user", userRoute);

app.use((req, res, next) => {
    res.render(path.join(__dirname, VIEWS_NAME, ERROR_FILE_NAME));
});

app.listen(process.env.PORT, () => {
    console.log(`${SERVER_START_MSG} ${process.env.PORT} `);
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

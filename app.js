//core modules
const path = require("path");

// Third party package imports
require("dotenv").config();
const express = require("express");
const app = express();

//Variable Declarations
const VIEW_ENGINE = "view engine";
const TEMPLT_ENGINE = "ejs";
const SERVER_START_MSG = "Server started & listening to port";
const VIEWS_NAME = "views";
const TEST_FILE = "test";
const PUBLIC_FOLDER_NAME = "public";

//Middlewares

app.set(VIEW_ENGINE, TEMPLT_ENGINE);
app.use(express.static(path.join(__dirname, PUBLIC_FOLDER_NAME)));

app.get("/", (req, res, next) => {
    res.render(path.join(__dirname, VIEWS_NAME, TEST_FILE));
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

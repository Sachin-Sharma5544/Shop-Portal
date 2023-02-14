require("dotenv").config();

const mongoose = require("mongoose");

const mongooseConnect = () => {
    return mongoose.connect(process.env.MONGODB_CONNECT_URI);
};

module.exports = mongooseConnect;

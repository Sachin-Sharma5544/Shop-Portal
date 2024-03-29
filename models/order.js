const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [
        {
            product: { type: Object, required: true, ref: "Product" },
            quantity: { type: Number, required: true },
        },
    ],
    user: {
        username: { type: String, required: true },
        userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    },

    orderTotal: { type: Number, required: true },
});

module.exports = mongoose.model("Order", orderSchema);

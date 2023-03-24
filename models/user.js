const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
                quantity: { type: Number, default: 0, required: true },
            },
        ],
        cartTotalPrice: { type: Number, required: true, default: 0 },
    },
});

module.exports = mongoose.model("User", userSchema);

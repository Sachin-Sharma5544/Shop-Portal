//Core Module imports
const { default: mongoose } = require("mongoose");
const path = require("path");

//Project import
const Product = require("../models/product");

//Variable Declarations
const VIEWS_NAME = "views";
const SHOP_PRODUCTS_FILE = "shop-products";
const SHOP_DETAILS_FILE = "shop-details";
const SHOP_CART_FILE = "cart";
const SHOP_ORDERS_FILE = "orders";
const SHOP_PRODUCT_DETAIL_FILE = "shop-productdetail";
const SHOP_FOLDER = "shop";

//details page
exports.getShopDetails = (req, res, next) => {
    Product.find({})
        .then((products) => {
            res.render(
                path.join(
                    __dirname,
                    "..",
                    VIEWS_NAME,
                    SHOP_FOLDER,
                    SHOP_DETAILS_FILE
                ),
                { pageTitle: "Shop Products", products: products }
            );
        })
        .then((err) => console.log(err));
};

//products page
exports.getShopProducts = (req, res, next) => {
    Product.find({})
        .then((products) => {
            res.render(
                path.join(
                    __dirname,
                    "..",
                    VIEWS_NAME,
                    SHOP_FOLDER,
                    SHOP_PRODUCTS_FILE
                ),
                { pageTitle: "Shop Products", products: products }
            );
        })
        .catch((err) => console.log(err));
};

//Product detail
exports.getShopProduct = (req, res, next) => {
    const { id } = req.params;
    Product.findOne({ _id: id })
        .then((product) => {
            res.render(
                path.join(
                    __dirname,
                    "..",
                    VIEWS_NAME,
                    SHOP_FOLDER,
                    SHOP_PRODUCT_DETAIL_FILE
                ),
                { pageTitle: "Shop Products", product: product }
            );
        })
        .catch((err) => console.log(err));
};

//cart page
exports.getCart = (req, res, next) => {
    req.user
        .populate("cart.items.productId")
        .then((user) => {
            return user.cart.items;
        })
        .then((products) => {
            // console.log(products);
            res.render(
                path.join(
                    __dirname,
                    "..",
                    VIEWS_NAME,
                    SHOP_FOLDER,
                    SHOP_CART_FILE
                ),
                { pageTitle: "Cart Information", products: products }
            );
        })
        .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
    const id = req.body.id;
    Product.findById({ _id: id })
        .then((product) => {
            const userCart = req.user.cart;
            const cpIndex = userCart.items.findIndex(
                (item) => item.productId.toString() == product._id.toString()
            );

            let prodQuantity = 1;

            if (cpIndex > -1) {
                prodQuantity = userCart.items[cpIndex].quantity + 1;
                userCart.items[cpIndex].quantity = prodQuantity;
            } else {
                userCart.items.push({
                    productId: product._id,
                    quantity: prodQuantity,
                });
            }
            req.user.cart = userCart;
            return req.user.save();
        })
        .then((result) => {
            res.redirect("/shop/cart");
        })
        .catch((err) => console.log(err));
};

exports.postDeleteCart = (req, res, next) => {
    const id = req.body.id.trim();
    //The issue on Cart page is resolved. There was extra space character in the id which was coming from cart page
    // Using trim method removed extra space and its now working
    const userCart = req.user.cart;
    userCart.items = userCart.items.filter(
        (item) => item.productId.toString() !== id
    );
    req.user.cart = { ...userCart };
    req.user.save((err) => {
        console.log(err);
        res.redirect("/shop/cart");
    });
};

//orders page
exports.getOrders = (req, res, next) => {
    res.render(
        path.join(__dirname, "..", VIEWS_NAME, SHOP_FOLDER, SHOP_ORDERS_FILE)
    );
};

exports.postIncQtyCart = (req, res, next) => {
    const id = req.body.id.trim();
    let updatedCart = { ...req.user.cart };

    const incProductIndex = updatedCart.items.findIndex(
        (item) => item.productId.toString() === id.toString()
    );
    let updateProduct = updatedCart.items[incProductIndex];
    updateProduct.quantity += 1;
    updatedCart.items[incProductIndex] = updateProduct;
    req.user.cart = { ...updatedCart };

    req.user.save((err) => {
        console.log(err);
        res.redirect("/shop/cart");
    });
};

exports.postDecQtyCart = (req, res, next) => {
    const id = req.body.id.trim();
    const updatedCart = { ...req.user.cart };
    const decProductIndex = updatedCart.items.findIndex(
        (item) => item.productId.toString() === id.toString()
    );
    let updateProduct = updatedCart.items[decProductIndex];
    updateProduct.quantity -= 1;
    updatedCart.items[decProductIndex] = updateProduct;
    req.user.cart = { ...updatedCart };

    req.user.save((err) => {
        console.log(err);
        res.redirect("/shop/cart");
    });
};

// ############################

// exports.postCart = (req, res, next) => {
//     const id = req.body.id;
//     console.log(id);
//     Product.findById({ _id: id })
//         .then((product) => {
//             const userCart = req.user.cart;
//             // console.log(userCart, "aa");
//             const cpIndex = userCart.items.findIndex(
//                 (item) => item.productId.toString() == product._id.toString()
//             );
//             console.log(cpIndex, "bb");

//             let prodQuantity = 1;

//             if (cpIndex > -1) {
//                 prodQuantity = userCart.items[cpIndex].quantity + 1;
//                 console.log(prodQuantity);
//                 userCart.items[cpIndex].quantity = prodQuantity;
//                 // console.log(userCart.items[cpIndex].quantity);
//                 console.log(userCart);
//             } else {
//                 userCart.items.push({
//                     productId: product._id,
//                     quantity: prodQuantity,
//                 });
//             }
//             req.user.cart = userCart;
//             return req.user.save();
//         })
//         .then((result) => {
//             res.redirect("/shop/cart");
//         })
//         .catch((err) => console.log(err));

//     //1. access the user cart
//     // let userCart = req.user.cart;
//     // console.log(userCart.items);

//     // const currentItemIndex = userCart.items.findIndex(
//     //     (item) => item.productId.toString() === id.toString()
//     //     // console.log(item.productId.toString() == id.toString(), "aa")
//     // );

//     // userCart.items.forEach((item, index) => {
//     //     if (item.productId.toString() === id.toString()) {
//     //         console.log(index, "bb");
//     //     }
//     // });

//     //2. find if product exist
//     //3. if product exist then increase the quantity
//     //4. if not push the item to the cart
//     //5. save the product to user cart
//     //6. save the cart info in data base as well
// };

// exports.getCart = (req, res, next) => {
//     let products = [1, 2, 3, 4, 5, 6, 7, 87];
//     // console.log(req.user.cart.productId);

//     //in both ways we can populate items in cart
//     console.log(
//         req.user.populate("cart.items.productId").then((user) => {
//             console.log(user.cart.items);
//         })
//     );

//     // console.log(
//     //     req.user.cart.populate("items.productId").then((result) => {
//     //         console.log("we are printing result");
//     //         console.log(result);
//     //     })
//     // );

//     res.render(
//         path.join(__dirname, "..", VIEWS_NAME, SHOP_FOLDER, SHOP_CART_FILE),
//         { pageTitle: "Cart Information", products: products }
//     );
// };

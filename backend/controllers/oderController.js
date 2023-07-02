const Order = require("../models/oderModel")
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");


// Create New Oder
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        oderItem,
        paymentInfo,
        itemPrice,
        texPrice,
        shippingPrice,
        totalPrice,
        address,
        city,
        pinCode,
        phoneNumber
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        address,
        city,
        pinCode,
        phoneNumber,
        oderItem,
        paymentInfo,
        itemPrice,
        texPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });
    res.status(201).json({
        success: true,
        order
    });
});

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler(`Oder not found with this id ${req.params.id}`), 404);
    }

    res.status(200).json({
        success: true,
        order
    });
});

// Get logged in user Orders

exports.getMyOrders = catchAsyncError(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        order
    });
});


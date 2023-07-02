const Order = require("../models/oderModel")
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { updateProduct } = require("./productController");


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

// Get All Orders

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        orders,
        totalAmount
    });
});


// Update oder Status

exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order not found this id ${req.params.id}`));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("your already delivered"), 404);
    }


    order.oderItem.forEach(async (ord) => {
        await updateStock(ord.product, ord.quantity);
    });


    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,

    })

});

async function updateStock(id, quantity) {
    console.log("hblvc",id,quantity);

    const product = await Product.findById(id);
    if(!product){
       console.log("productnot found");
       return ;
    }
    product.Stock -= quantity;
    await product.save({ validateBeforeSave: false });
}


exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Oder not found with this id ${req.params.id}`), 404);
    }

    await Order.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: true,

    })

});
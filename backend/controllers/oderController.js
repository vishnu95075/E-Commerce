const Oder = require("../models/oderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");


// Create New Oder
exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const {
        shippingInfo,
        oderItem,
        paymentInfo,
        itemPrice,
        texPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Oder.create({
        shippingInfo,
        oderItem,
        paymentInfo,
        itemPrice,
        texPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })
    res.status(201).json({
        success:true,
        order
    })
})
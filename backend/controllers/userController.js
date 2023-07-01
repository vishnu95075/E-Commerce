const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const Product = require("../models/productModel")
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "Sample Id",
            url: "sample url"
        }
    });

    sendToken(user, 200, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !email) {
        return next(new ErrorHandler("Please Enter Email & Password ", 400))
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or Password"), 401);
    }

    const isPasswordMatch = await user.comparePassword(password);
    console.log("isPasswordMatch  ", isPasswordMatch);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or Password"), 401);
    }

    sendToken(user, 200, res);
});


exports.logOut = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: false
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
});

// Forget password 

exports.forgetPassword = catchAsyncError(async (req, res, next) => {
    const email = await req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get Reset Password Token

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your reset password Token is : \n\n ${resetPasswordUrl} \n\n 
   If you have not requested this, email please ignor it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `E commerce Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} seuccefully`
        })
    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }

});


exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // Creating token hash

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Reset password Token is Invalid or has been expired", 404));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not matched", 404));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

//Get User Detail

exports.getUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })


});

//  Update user password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    console.log("req.body  ", req.body);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Old Password is Incorect"), 401);
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password Don't matched"), 401);
    }

    user.password = req.body.newPassword;

    await user.save();
    sendToken(user, 200, res);

});

//  Update user Profile

exports.updateUserProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    console.log("newUserData ->> ", newUserData);
    //We will add Cloudany later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    console.log("user is ", req.user.id);
    res.status(200).json({
        success: true,
        user
    });

});

// Get all users { Admin }

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
});

// Get single user { Admin }

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found"), 404);
    }

    res.status(200).json({
        success: true,
        user
    })

});

//  Update user Roles

exports.updateUserRole = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };
    console.log("newUserData ->> ", newUserData);
    //We will add Cloudany later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    console.log("user is ", req.user.id);

    res.status(200).json({
        success: true,
        user
    });

});

//  Delete user ->>Admin

exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User doesn't exit with this id : ${req.params.id}`));
    }

    await User.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: true,
        message: "User succesfully delete"
    });

});

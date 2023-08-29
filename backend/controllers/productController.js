const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeature");

//Create New Product --> Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    const data = await req.body;
    req.body.user = req.user.id;
    const product = await Product.create(data);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(201).json({
        success: true,
        product
    })
    console.log(product);
}
);
//Get All Products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apifeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = await apifeature.query;

    if (!products) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        seccess: true,
        products,
        productsCount,
        resultPerPage
    })
});
//Update Product -->Admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let id = await req.params.id;
    let new_body = await req.body;
    let product = Product.findById(id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    product = await Product.findByIdAndUpdate(id, new_body, {
        new: true,
        runValidators: true,
        useFinAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
});

// Delete Product 
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    await Product.findByIdAndRemove(id);

    res.status(200).json({
        success: true,
        message: "Product Succesfully  deleted"
    })
});

//  Get Product Details

exports.getProductDetail = catchAsyncError(async (req, res, next) => {
    let id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    })
});


// Create Product  new Review and update

exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    console.log(review)
    const product = await Product.findById(productId);

    const isReview = product.reviews.find(
        rev => rev.user.toString() === req.user._id.toString()
    );

    if (isReview) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        });

    }
    else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let avgRatings = 0;
    product.reviews.forEach(rev => {
        avgRatings += rev.rating;
    })


    product.ratings = avgRatings / product.reviews.length;
    console.log("avag  ", product.ratings);
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        product
    })

});

// Get All product reviews

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not Found"), 404);
    }

    res.status(200).json({
        success: true,
        review: product.reviews
    });
});

exports.deleteProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not Found"), 404);
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avgRatings = 0;
    reviews.forEach(rev => {
        avgRatings += rev.rating;
    })

    ratings = avgRatings / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    }, {
        new: true,
        runValidators: true,
        useFinAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})
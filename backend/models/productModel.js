const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter The Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Plaese Enter The Product Price"],
        maxLength: [8, "Price can not exceed 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please Enter Product Catagory"]
    },
    Stock: {
        type: Number,
        required: [true, "Please Enter The Stock Number"],
        maxLength: [4, "Stoch can not exceed 4 character"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            require: true
        },
        name: {
            type: String,
            // required: true
        },
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        comment: {
            type: String,
            // required:true
        }
    }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);
const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name"],
    },
    description: {
        type: String,
        required: [true, "Please Enter The description"]
    },
    price: {
        type: Number,
        required: [true, "Plaese Enter THe Price"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    image: [{
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    }],
    category: {
        type: String,
        // required: [true, "Please Enter Product Catagory"]
    },
    Stock: {
        type: Number,
        // required: [true, "Please Enter The Nuber"],
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
            // required: true,
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
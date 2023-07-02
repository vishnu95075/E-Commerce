const mongoose = require("mongoose");

const oderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, "Please Enter The Address."]
        },
        city: {
            type: String,
            required: [true, "Please Enter The City."]
        },
        state: {
            type: String,
            required: [true, "Please Enter The Address."]
        },
        country: {
            type: String,
            default: "India",
        },
        pinCode: {
            type: Number,
            required: [true, "Please Enter The Pin Code."]
        },
        phoneNumber: {
            type: String,
            default: "India",
            required: [true, "Please Enter The Phone Number."]
        }
    },
    oderItem: [
        {
            name: {
                type: String,
                required: [true, "Please Enter The Name."]
            },
            price: {
                type: Number,
                required: [true, "Please Enter The Price."]
            },
            quantity: {
                type: Number,
                required: [true, "Please Enter The Quantity."]
            },
            image: {
                type: String,
                required: [true, "Please Enter The Image."]
            },
            product: {
                type: String,
                ref: "Product",
                required: [true, "Please Enter The Image."]
            },

        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        paidAt: {
            type: Date,
            default: 0,
            required: true
        },
        iteamPrice: {
            type: Number,
            required: true,
            default: 0
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0
        },

    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    deliverAt: Date,
    createAt: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model("Order", oderSchema);
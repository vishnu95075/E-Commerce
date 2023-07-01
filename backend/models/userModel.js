const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Can not exced 30 Character"],
        minLength: [4, "Can not less than 4 Character"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        maxLength: [15, "Can not exced 30 Character"],
        minLength: [4, "Can not less than 4 Character"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// Hashing Password

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        });
};

//  Compare Password
userSchema.methods.comparePassword = async function (enterPassword) {
    console.log(enterPassword, this.password, await bcrypt.compare(enterPassword, this.password));
    return await bcrypt.compare(enterPassword, this.password);
};



//Generation token Reset Password

userSchema.methods.getResetPasswordToken = function () {
    // Generating TOken
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Hashing and reset password user Schema

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;

};




module.exports = mongoose.model("User", userSchema);

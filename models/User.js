const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    school:{ type: String, require: true},
    faculty: {type: String,required: true,},
    department: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {type: String},
    otpExpiry: {type: Date},
    isVerified: {type: Boolean, default: false},
    refreshToken: {type: String}
})

const User = mongoose.model('User', userSchema)
module.exports = User;
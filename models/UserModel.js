const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isConfirmed: { type: Boolean, required: true, default: 0 },
        confirmOTP: { type: Number, required: false },
        status: { type: Boolean, required: true, default: 1 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CustomerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, default: 'person' },
        phone: { type: Array },
        sex: { type: String },
        birthday: { type: String },
        email: { type: String },
        facebook: { type: String },
        company: { type: String },
        address: { type: String },
        city: { type: String },
        district: { type: String },
        subDistrict: { type: String },
        taxCode: { type: String },
        lastDateTransaction: { type: String },
        debt: { type: Number, default: 0 },
        totalBuy: { type: Number, default: 0 },
        note: { type: String },
        status: { type: String },
    },
    { timestamps: true }
);

CustomerSchema.index({ name: 'text' });

module.exports = mongoose.model('Customer', CustomerSchema);

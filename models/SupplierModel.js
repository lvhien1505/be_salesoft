const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SupplierSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: Array },
        email: { type: String },
        company: { type: String },
        address: { type: String },
        city: { type: String },
        district: { type: String },
        subDistrict: { type: String },
        taxCode: { type: String },
        lastDateTransaction: { type: String },
        debt: { type: Number, default: 0 },
        totalBuy: { type: Number, default: 0 },
        note:{type:String},
        status: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Supplier', SupplierSchema);

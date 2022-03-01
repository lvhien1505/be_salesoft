const mongoose = require('mongoose');

const InvoicePurchaseSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        code: { type: String, required: true, unique: true },
        datePurchase: { type: Date },
        dateUpdated: { type: Date },
        codeReturnsPurchase: { type: String },
        codeSupplier:{type:String},
        nameSupplier: { type: String },
        phoneSupplier: { type: String },
        totalNum: { type: Number },
        totalNumProduct: { type: Number },
        totalPrice: { type: Number },
        saleOff: { type: Number },
        totalPayment: { type: Number },
        totalPaid: { type: Number },
        note: { type: String },
        status: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('InvoicePurchase', InvoicePurchaseSchema);
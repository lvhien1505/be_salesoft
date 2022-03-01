const mongoose = require('mongoose');

const InvoiceReturnsPurchaseSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        code: { type: String, required: true, unique: true },
        dateReturns: { type: Date },
        codeSupplier:{type:String},
        nameSupplier: { type: String },
        phoneSupplier: { type: String },
        totalNum: { type: Number },
        totalNumProduct: { type: Number },
        totalPrice: { type: Number },
        feeReturns: { type: Number },
        totalPayment: { type: Number },
        totalPaid: { type: Number },
        note: { type: String },
        status: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('InvoiceReturnsPurchase', InvoiceReturnsPurchaseSchema);
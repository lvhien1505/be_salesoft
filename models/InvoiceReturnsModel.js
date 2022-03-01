const mongoose = require('mongoose');

const InvoiceReturnsSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        code: { type: String, required: true, unique: true },
        dateReturns: { type: Date },
        codeInvoice: { type: String },
        codeCustomer:{type:String},
        nameCustomer: { type: String },
        phoneCustomer: { type: String },
        totalPrice: { type: Number },
        feeReturns: { type: Number },
        collectBonus: { type: Number },
        totalPaymentForCustomer: { type: Number },
        totalPaidForCustomer: { type: Number },
        note: { type: String },
        status: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('InvoiceReturns', InvoiceReturnsSchema);
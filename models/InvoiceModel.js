const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema(
    {
        products: { type: Array },
        dateSell: { type: String },
        dateUpdated: { type: String },
        codeReturns: { type: String },
        customer: { type: String, ref: 'Customer' },
        hasCustomer: { type: Boolean, default: true },
        totalPrice: { type: Number },
        saleOff: { type: Number },
        totalPayment: { type: Number },
        totalPaid: { type: Number },
        change: { type: Number },
        note: { type: String },
        status: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Invoice', InvoiceSchema);

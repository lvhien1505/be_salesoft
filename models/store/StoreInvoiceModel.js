const mongoose = require('mongoose');

const StoreInvoiceSchema = new mongoose.Schema(
    {
        storeID: { type: String },
        counter: {
            type: Number,
            default: 0,
        },
        invoices: [
            {
                code: { type: Number },
                invoice: { type: String },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('StoreInvoice', StoreInvoiceSchema);

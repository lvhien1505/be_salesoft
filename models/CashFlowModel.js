const mongoose = require('mongoose');

const CashFlowSchema = new mongoose.Schema(
    {
        type:{ type: String },
        methodPayment: { type: String, default: 'money' },
        datePayment: { type: String },
        typeTarget: { type: String },
        target: { type: Object },
        price: { type: Number },
        note: { type: String },
        status: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('CashFlow', CashFlowSchema);

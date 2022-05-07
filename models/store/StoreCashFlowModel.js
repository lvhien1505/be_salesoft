const mongoose = require('mongoose');

const StoreCashFlowSchema = new mongoose.Schema(
    {
        storeID: { type: String },
        counter: {
            type: Number,
            default: 0,
        },
        cashflows: [
            {
                code: { type: Number },
                cashflow: { type: String },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('StoreCashFlow', StoreCashFlowSchema);

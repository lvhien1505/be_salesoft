const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema(
    {
        type: { type: String, required: true },
        price: { type: Number, default: 0 },
        ignorePrice: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('History', HistorySchema);

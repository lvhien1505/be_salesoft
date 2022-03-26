const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Store', StoreSchema);

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `uploads/${req.user._id}/images/products/files`);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + Date.now());
    },
});

const upload = multer({ storage: storage });

module.exports = {
    upload,
};

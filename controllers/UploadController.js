const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = `uploads/${req.user._id}/files`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true,
            });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            '.' +
            file.originalname.split('.')[1];
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

module.exports = {
    upload,
};

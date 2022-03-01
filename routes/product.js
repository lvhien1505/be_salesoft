const express = require('express');
const ProductController = require('../controllers/ProductController');
const { upload } = require('../controllers/UploadController');
const {
    validationResult,
    validatorLogin,
    validatorRegister,
} = require('../middlewares/validator');
const authenticate = require('../middlewares/jwt');

const router = express.Router();

router.post('/', authenticate, ProductController.getProductsWithLimit);
router.post(
    '/create',
    authenticate,
    upload.array('photos[]', 5),
    ProductController.create
);

module.exports = router;

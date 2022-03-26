const express = require('express');
const ProductController = require('../controllers/ProductController');
const { upload } = require('../controllers/UploadController');
const authenticate = require('../middlewares/jwt');
const getStoreID = require('../middlewares/getStoreID');

const router = express.Router();

router.post('/', authenticate,getStoreID, ProductController.getProductsWithLimit);
router.post(
    '/create',
    authenticate,
    getStoreID,
    upload.array('photos[]', 5),
    ProductController.create
);
router.put('/', authenticate, ProductController.update);

module.exports = router;

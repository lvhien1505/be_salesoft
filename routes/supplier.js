const express = require('express');
const SupplierController = require('../controllers/SupplierController');
const authenticate = require('../middlewares/jwt');
const getStoreID = require('../middlewares/getStoreID');

const router = express.Router();

router.post(
    '/',
    authenticate,
    getStoreID,
    SupplierController.getSuppliersWithLimit
);
router.post('/create', authenticate, getStoreID, SupplierController.create);
router.put('/', authenticate, SupplierController.update);

module.exports = router;

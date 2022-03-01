const express = require('express');
const SupplierController = require('../controllers/SupplierController');
const authenticate = require('../middlewares/jwt');

const router = express.Router();

router.post('/', authenticate, SupplierController.getSuppliersWithLimit);
router.post('/create', authenticate, SupplierController.create);

module.exports = router;

const express = require('express');
const InvoiceController = require('../controllers/InvoiceController');
const CashFlowController = require('../controllers/CashFlowController');
const authenticate = require('../middlewares/jwt');
const getStoreID = require('../middlewares/getStoreID');

const router = express.Router();

router.post(
    '/',
    authenticate,
    getStoreID,
    InvoiceController.getInvoicesWithLimit
);
router.post('/create', authenticate,getStoreID, InvoiceController.create,CashFlowController.create);
// router.post('/search', authenticate, InvoiceController.search);
router.put('/', authenticate, InvoiceController.update);

module.exports = router;

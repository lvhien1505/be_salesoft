const express = require('express');
const CashFlowController = require('../controllers/CashFlowController');
const authenticate = require('../middlewares/jwt');
const getStoreID = require('../middlewares/getStoreID');

const router = express.Router();

router.post(
    '/',
    authenticate,
    getStoreID,
    CashFlowController.getInvoicesWithLimit
);
router.post('/create', authenticate, getStoreID, CashFlowController.create);
router.put('/', authenticate, CashFlowController.update);

module.exports = router;
const express = require('express');
const CustomerController = require('../controllers/CustomerController');
const authenticate = require('../middlewares/jwt');
const getStoreID = require('../middlewares/getStoreID');

const router = express.Router();

router.post(
    '/',
    authenticate,
    getStoreID,
    CustomerController.getCustomersWithLimit
);
router.post('/create', authenticate, getStoreID, CustomerController.create);
router.post('/search', authenticate, getStoreID, CustomerController.search);
router.put('/', authenticate, CustomerController.update);

module.exports = router;

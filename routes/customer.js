const express = require('express');
const CustomerController = require('../controllers/CustomerController');
const authenticate = require('../middlewares/jwt');

const router = express.Router();

router.post('/', authenticate, CustomerController.getCustomerWithLimit);
router.post('/create', authenticate, CustomerController.create);

module.exports = router;

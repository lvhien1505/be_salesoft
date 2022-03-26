const express = require('express');
const InvoiceController = require('../controllers/InvoiceController');
const authenticate = require('../middlewares/jwt');

const router = express.Router();

router.post('/', authenticate, InvoiceController.getInvoicesWithLimit);
router.post('/create', authenticate, InvoiceController.create);
// router.post('/search', authenticate, InvoiceController.search);
router.put('/', authenticate, InvoiceController.update);

module.exports = router;
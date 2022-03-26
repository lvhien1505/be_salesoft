const express = require('express');
const TablePriceController = require('../controllers/TablePriceController');
const authenticate = require('../middlewares/jwt');
const getStoreID = require('../middlewares/getStoreID');

const router = express.Router();

router.post('/', authenticate, getStoreID, TablePriceController.getAll);
router.post('/create', authenticate, getStoreID, TablePriceController.create);
router.put('/', authenticate, TablePriceController.update);
router.put('/push-price', authenticate, TablePriceController.pushPrice);
router.put('/update-price', authenticate, TablePriceController.updatePrice);
router.delete('/', authenticate, getStoreID, TablePriceController.remove);

module.exports = router;

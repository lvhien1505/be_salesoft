const express = require('express');
const BrandController = require('../controllers/BrandController');
const authenticate = require('../middlewares/jwt');
const getStoreID = require('../middlewares/getStoreID');

const router = express.Router();

router.post('/', authenticate, getStoreID, BrandController.getAll);
router.post('/create', authenticate, getStoreID, BrandController.create);
router.put('/', authenticate, BrandController.update);
router.delete('/', authenticate, getStoreID, BrandController.remove);

module.exports = router;

const express = require('express');
const BaseController = require('../controllers/BaseController');
const BrandProductModel = require('../models/product/BrandModel');
const authenticate = require('../middlewares/jwt');

const router = express.Router();

router.post('/', authenticate, BaseController.getAll(BrandProductModel));
router.post('/create', authenticate, BaseController.create(BrandProductModel));
router.put('/', authenticate, BaseController.update(BrandProductModel));
router.delete('/', authenticate, BaseController.remove(BrandProductModel));

module.exports = router;

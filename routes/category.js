const express = require('express');
const BaseController = require('../controllers/BaseController');
const CategoryProductModel = require('../models/product/CategoryModel');
const authenticate = require('../middlewares/jwt');

const router = express.Router();

router.post('/', authenticate, BaseController.getAll(CategoryProductModel));
router.post('/create', authenticate, BaseController.create(CategoryProductModel));
router.put('/', authenticate, BaseController.update(CategoryProductModel));
router.delete('/', authenticate, BaseController.remove(CategoryProductModel));

module.exports = router;

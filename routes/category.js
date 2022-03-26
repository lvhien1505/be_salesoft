const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const authenticate = require('../middlewares/jwt');
const getStoreID = require('../middlewares/getStoreID');

const router = express.Router();

router.post('/', authenticate, getStoreID, CategoryController.getAll);
router.post('/create', authenticate, getStoreID, CategoryController.create);
router.put('/', authenticate, CategoryController.update);
router.delete('/', authenticate, getStoreID, CategoryController.remove);

module.exports = router;

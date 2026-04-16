const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getProductsByStore,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();
router.get('/store/:storeId', getProductsByStore);
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;

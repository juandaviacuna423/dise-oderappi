const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const checkOwner = require('../middleware/checkOwner');
const {
  getStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore
} = require('../controllers/storeController');

const router = express.Router();
router.get('/', getStores);
router.get('/:id', getStoreById);
router.post('/', authMiddleware, createStore);
router.put('/:id', authMiddleware, checkOwner, updateStore);
router.delete('/:id', authMiddleware, checkOwner, deleteStore);

module.exports = router;

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createOrder, getMyOrders, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();
router.post('/', authMiddleware, createOrder);
router.get('/my', authMiddleware, getMyOrders);
router.patch('/:id/status', authMiddleware, updateOrderStatus);

module.exports = router;

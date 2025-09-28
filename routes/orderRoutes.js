const express = require('express');
const {createOrder, getAllOrders, getMyOrder, updateOrderStatus} = require('../controllers/orderController');
const {payOrder} = require('../controllers/paymentController');
const {auth, isAdmin} = require('../middleware/authmiddleware');

const router = express.Router();

//User Routes

router.post('/', auth, createOrder);
router.get('/myorders', auth, getMyOrder);
router.get('/:id/pay', auth, payOrder);

//Admin Routes

router.get('/', auth, isAdmin, getAllOrders);
router.put('/:id', auth, isAdmin, updateOrderStatus);

module.exports = router;
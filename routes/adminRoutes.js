const express = require('express');
const router = express.Router();
const {getProducts} = require('../controllers/productController');
const {getAllOrders} = require('../controllers/orderController');
const {auth, isAdmin} = require('../middleware/authmiddleware');
const Order = require('../models/order');

router.get('/products', auth, isAdmin, getProducts);
router.get("/orders", auth, isAdmin, getAllOrders);

router.put('/orders/:id/status', auth, isAdmin, async(req, res) => {
    try{
        const order = await Order.findById(req.params.id); 
        if (!order){
            return res.status(404).json({message : 'Order not found !'});
        }

        order.status = req.body.status || order.status;
        await order.save();

        res.json({message: 'Order status updated', order});
    } catch (err){
        console.error('Error updating order status:', err);
        res.status(500).json({message: 'Server Error'})
        
    }
});

module.exports = router;
const Order = require('../models/order');

const payOrder = async(req, res) => {
    try{
        const orderId = req.params.id;
        const {paymentResult} = req.body;

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({message : 'Order not found !'});

        if(order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin'){
            return res.status(403).json({message : 'Not authorized to update this order !!!'});
        }

        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = paymentResult || {
            id: "manual",
            status: "success",
            update_time : new Date().toISOString(),
            email_address: req.user.email,
        };

        order.status = 'paid';

        const updated = await order.save();
        return res.json({message : 'Order paid', order: updated});

    } catch(err){
        console.error('payOrder error', err.message);
        return res.status(500).json({message: 'Server Error'})
    }
};

module.exports = {payOrder};
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');

const checkout = async (req, res) => {
    try{
        const {paymentMethod} = req.body;
        const cart = await Cart.findOne({user: req.user._id}).populate('items.product');

        if (!cart || cart.items.length === 0){
            return res.status(400).json({message : 'Cart is empty'})
        };

        const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
        );

        //create order

        const order = new Order({
            user: req.user._id,
            orderItems: cart.items.map((i)=> ({
                product : i.product,
                quantity: i.quantity,
            })),
            shippingAddress: req.body.shippingAddress,  
            totalPrice,
            paymentMethod: paymentMethod || "COD",
            paymentStatus: paymentMethod === "COD" ? 'pending' : "paid",
        });

        await order.save();


       //reduce stock

        for (let item of cart.items){
           const product = await Product.findById(item.product._id);
           if (product){
                 product.stock -= item.quantity;
                 if (product.stock < 0) product.stock = 0;
                 await product.save();
             }
         }

        cart.items = [];
        await cart.save();
        return res.status(201).json({
  message: "Order placed successfully",
  order,
});
    } catch(err){
        console.error('Checkout error', err.message);
        res.status(500).json({message: 'Server error ~'})
    } 
};


module.exports = {checkout};
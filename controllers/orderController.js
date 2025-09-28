const Order = require('../models/order');

//  Create new order

const createOrder = async (req, res)=>{
    try{
        const order = new Order ({
            user: req.user._id, //here 'user' is a field inside your Order schema. in Order model, user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }) is there.
            //user: req.user._id → connects the order to the logged-in user.
            ...req.body, //...req.body, it spreads out everything inside that box and puts them directly inside the new Order.
        });
        await order.save();
        return res.status(201).json({message : 'Order placed successfully', order});
    }catch(err){
        console.error('Create order error', err.message);
        return res.status(500).json({message : 'Server Error'});
        
    }
};

//Get all orders (Admin)

const getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find().populate('user', 'name email');
        return res.json({ orders });
    } catch (err){
        console.error('Get Orders error:', err.message);
        return res.status(500).json({message: 'Server Error'});
    }
};

//Get my orders (User)

const getMyOrder = async (req, res) => {
    try{
        const orders = await Order.find({user: req.user._id}).populate('orderItems.product', 'title price');
        return res.json(orders);
    } catch (err){
        console.error('Get Orders error:', err.message);
        return res.status(500).json({message: 'Server Error'})
    }
};

//  Update order status (Admin)

const updateOrderStatus = async(req, res)=>{
    try{
        const order = await Order.findById(req.params.id);
        if(!order) return res.status(404).json({message: 'Order not Found !'});

        order.status = req.body.status || order.status; // req.body.status → new status sent by the client in the request body
        // || order.status → means "if req.body.status is empty/undefined, keep the old status".
        await order.save();

        return res.json({message: 'Order status updated', order})
    } catch (err){
        console.error('Update Order error:', err.message);
        return res.status(500).json({message: 'Server Error'})
    }
};


module.exports = 
{
    createOrder,
    getAllOrders,
    getMyOrder,
    updateOrderStatus,
}
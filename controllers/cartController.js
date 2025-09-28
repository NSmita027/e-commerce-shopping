const Cart = require('../models/cart');
const Product = require('../models/product');

const getCart = async(req, res) => {
    try{
        let cart = await Cart.findOne({user: req.user._id}).populate('items.product');
        if(!cart) {
            return res.json({items:[]});
        }

        res.json(cart);
    } catch(err){
        console.error('Error getting cart', err);
        res.status(500).json({message: 'Server Error'});
        
    }
};

const addToCart = async(req, res) => {
    try{
        const {productId, quantity} = req.body;
        if(!productId || !quantity){
            return res.status(400).json({message: 'Product and Quantity are required !'});
        }
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({message: 'Product not found'});

        let cart = await Cart.findOne({user: req.user._id});
        if(!cart){
            cart = new Cart({user: req.user._id, items: []});
        }

        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId 
        );

        if (existingItem){
            existingItem.quantity += quantity;
        } else {
            cart.items.push({product: productId, quantity});
        }

        await cart.save();
        cart = await cart.populate('items.product'); 
        res.json(cart);

    } catch(err){
        console.error("Error adding to cart:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

const updateCartItem = async (req, res) => {
    try{
        const {productId, quantity} = req.body;
        let cart = await Cart.findOne({user: req.user._id});
        if (!cart) return res.status(404).json({message: 'Cart not found !'});

        const item = await cart.items.find(
            (item) => item.product.toString() === productId
        )

        if(!item) return res.status(404).json({message: 'Item not found in cart'});
        item.quantity = quantity;
        await cart.save();
        cart = await cart.populate('items.product'); 
        res.json(cart);
    } catch(err){
        console.error('Error updating cart item:', err.message);
        res.status(500).json({message: 'Server Error'});  
    }
};

const removeFromCart = async(req, res) => {
    try{
        const {productId} = req.params;
        let cart = await Cart.findOne({user : req.user._id});
        if(!cart) return res.status(404).json({message: 'Cart not found'});

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();
        cart = await cart.populate('items.product'); 
        res.json(cart);
    } catch (err){
        console.error('Error removing from cart:', err.message);
        res.status(500).json({message : 'Server Error'})
        
    }
};

const clearCart = async(req, res) => {
    try{
        let cart = await Cart.findOne({user : req.user._id});
        if(!cart) return res.status(404).json({message: 'Cart not found'});

        cart.items = [];

        await cart.save();
        res.json({message : 'Cart cleared'});

    } catch(err){
        console.error('Error clearing cart:', err.message);
        res.status(500).json({message: 'Server error'});
        
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};

const express = require("express");
const router = express.Router();

const {
     getCart,
     addToCart,
     updateCartItem,
     removeFromCart,
     clearCart,
} = require('../controllers/cartController');

const {auth} = require('../middleware/authmiddleware');
// const router = require("./orderRoutes");

router.get('/', auth, getCart);
router.post('/', auth, addToCart);
router.put('/', auth, updateCartItem);
router.delete('/:productId', auth, removeFromCart);
router.delete('/', auth, clearCart);

module.exports = router;
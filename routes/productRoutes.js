const express = require('express');
const router = express.Router();

const { createProduct, 
    getProducts, 
    getProductbyId, 
    updateProduct, 
    deleteProduct} = require ('../controllers/productController');

    const {auth, isAdmin} = require("../middleware/authmiddleware")

    //  Public routes

    router.get('/', getProducts);
    router.get('/:id', getProductbyId);

    //Protected/Admin routes (for now we’ll keep open, later add auth middleware)

    router.post('/', auth, isAdmin, createProduct);
    router.put('/:id', auth, isAdmin, updateProduct);
    router.delete('/:id',auth, isAdmin, deleteProduct);

    module.exports = router;
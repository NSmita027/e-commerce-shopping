const Product = require('../models/product');

// CREATE a new product (POST /api/products)

const createProduct = async (req, res)=>{
    try{
        const product = new Product(req.body);
        await product.save();
        return res.status(201).json({message : 'Product created', product});
    } catch (err){
        console.error('Create Product error', err.message);
        return res.status(500).json({message : 'Server Error'})
    }
};

// GET all products (GET /api/products)

const getProducts = async (req, res) => {
    try{

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        //to search & filter

        const keyword = req.query.keyword ? {title : {$regex: req.query.keyword, $options: "i"}}: {}; 

        //req.query.keyword → comes from the URL
        //If it exists → we create a MongoDB regex filter
        //{ title: { $regex: "watch", $options: "i" } }
        //$regex = "find words that look like this" (pattern matching).
        //$options: "i" = case insensitive → "Watch", "WATCH", "waTch" → all match.

        //If user didn’t give a keyword, it just becomes {} (no filter).

        const category = req.query.category ? {category : req.query.category} : {};
        const priceFilter = {};
        if (req.query.minPrice) priceFilter.price = {$gte: Number(req.query.minPrice)};
        if (req.query.maxPrice) priceFilter.price = {...priceFilter.price, $lte: Number(req.query.maxPrice)};

        const filters = {...keyword, ...category, ...priceFilter};

        const total = await Product.countDocuments(filters); //eg: we have 84 products
        const products = await Product.find(filters)
        .skip(skip) //skips first X products. -> if we are on page 7, then it will skip (7-1)*10 = 60 products
        .limit(limit); //only takes a certain number of products. -> after skipping it will show limit [10] products..So we will see products 61–70.
        console.log("Incoming query:", req.query); 

        return res.json({
            products,
            page,
            totalPages : Math.ceil(total/limit), //[84/10] = 8.4 => 9[ceil round up] so total 9 pages
            totalProducts : total,
            
        });

    } catch (err){
        console.error('Get Products Error', err.message);
        return res.status(500).json({message : 'Server Error'});
    }
};


//  GET single product by ID (GET /api/products/:id)

const getProductbyId = async(req, res)=>{
    try{
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({message : 'Product not found !!!'});
        return res.json(product);
    } catch (err){
        console.error('Get Product by ID error', err.message);
        return res.status(500).json({message : 'Server Error'});
    }
}


//  UPDATE product (PUT /api/products/:id)

const updateProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!product) return res.status(404).json({message: "Product not found"});
        return res.json({ message: "Product updated", product})
    } catch(err){
        console.error('Update Product error', err.message);
        return res.status(500).json({message : 'Server Error'});
    }
};

// DELETE product (DELETE /api/products/:id)

const deleteProduct = async(req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) return res.status(404).json({message: 'Product not found !'});
        return res.json({message: 'Product Deleted !'});
    } catch(err){
        console.error('Delete Product error', err.message);
        return res.status(500).json({message : 'Server Error'});
    }
};

module.exports = {
    createProduct, 
    getProducts, 
    getProductbyId, 
    updateProduct, 
    deleteProduct
};
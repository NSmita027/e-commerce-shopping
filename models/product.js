const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    //basic info
    title : { type : String, required : true, trim: true }, //e.g., "Slim Fit T-Shirt"
    description : { type: String, default : ''},


    //pricing & stock
    price: {type : Number, required : true, min : 0},
    stock: {type: Number, default : 0},           // how many items available

    // cataloging
    brand: {type: String, default: ''},
    department: {type : String, enum: ['men', 'women', 'kids', 'unisex', 'home', 'electronics'], required: true,},     // where it shows on the site
    category: {type : String, default : ''}, // e.g., "tshirts", "jeans", "shoes"
    subcategory: {type: String, default: ''},   // optional refinement


    //UI/Media
    images : [{type: String}],   // image URLs or file paths (we'll wire Multer later)
    colours: [{type: String}],    // e.g., ["red","black"]
    sizes: [{type: String}],        // e.g., ["S","M","L","XL"]


    // ratings (we’ll wire real reviews later)
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },


     // visibility toggle
     isActive: {type: Boolean, default: true},

},

   {timestamps: true}
);

module.exports = mongoose.model('Product', productSchema);
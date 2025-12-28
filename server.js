const express = require ('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();

connectDB();



//middlewares

app.use(cors({origin:true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/checkout', require('./routes/checkoutRoutes'));
app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));
//test route 



app.get('/api/health', (req, res)=> {
    res.json({status: 'ok', message : "Server is Running !"});
});



//start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
    
});
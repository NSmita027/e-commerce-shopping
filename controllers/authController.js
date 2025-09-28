const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res)=> {
    try{
        const {name, email, password} = req.body;

        if (!name || !email || !password){
            return res.status(400).json({message: 'Name, Email, and password are required !'});
        }

        //check if email exists or not

        const existing = await userModel.findOne({email});
        if(existing) {
            return res.status(400).json({message: "User already exists with this email"});
        };

        //bcrypt hash pswd

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const createdUser = await userModel.create({
            name,
            email,
            password: hashed
        });

        //never sent password back

        const safeUser = createdUser.toObject(); //.toObject convert fancy mongoose object into plain js
        delete safeUser.password; //we dont want to give password back to frontend again(even though it is now hashed so here we are going to delete it)

        return res.status(201).json({message: "User registered successfully", createdUser: safeUser})
    }

    catch(err){
        console.error('Register Error:', err.message);
        return res.status(500).json({message: 'Server Error !!!'})
    }
};

//login

const loginuser = async (req, res)=>{
    try{
        const {email, password} = req.body;

        //basic validation - if user is clicking login btn without filling credentials 
        if(!email || !password) {
            return res.status(400).json({message: 'Email or Password are required !'})
        }

        //after filling email and password, check if this email is registered or not ?
        const user = await userModel.findOne({email});
        if (!user) return res.status(400).json({message: 'Invalid email or password !'});

        //now if email is correct, we should check if password is correct or not ?
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({message: 'Invalid email or password !'});

        //now generate JWT
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn : '7d'});

        //make a safe copy [no password]
        const safeUser = user.toObject();
        delete safeUser.password;

        //set httponly cookie for token
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite : 'lax',
        //     maxAge : 24 * 60 * 60 * 1000
        // });

        return res.json({message: "Login Successful", token, user: safeUser });

    } catch (err){
        console.error('Login Error:', error.message);
        return res.status(500).json({message: 'Server Error'});
        
    }
};


module.exports= {registerUser, loginuser};
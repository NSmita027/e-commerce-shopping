const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const auth = async (req, res, next) => {
    try {
        let token;

        //1] prefer 'authorization header' : 'bearer <token>'
        //every http request contains some headers .. one common header is authorization...
        const authHeader = req.headers.authorization; //req.headers.authorization will give that header
        if(authHeader && authHeader.startsWith('Bearer')){  //now select that authorization header which starts from bearer: Bearer : abc123TOKEN
            token = authHeader.split(' ')[1]; //now remove that bearer part and save that string in token ..now token : abc123TOKEN
        }

        //2] fallback to cookie named 'token' - if no token is found in header, find it in cookie

        if(!token && req.cookies && req.cookies.token){
            token = req.cookies.token; //if no token is found in header, but a cookie named 'token' exists then use that as a token
        }

        if (!token){
            return res.status(401).json({message : 'Not Authorized: token missing'}) //if no token is found in header or cookie, then error
        }

        //3] verify token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        //4] Attach user to req

        const user = await userModel.findById(decoded.id).select('-password');
        if(!user) return res.status(401).json({message: 'User Not found !'});

        req.user = user;
        next();

    } catch(err){
        return res.status(401).json({message: 'Not Authorized: Invalid or Expired token'});
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }

};

module.exports = {auth, isAdmin};
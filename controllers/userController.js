const userModel = require('../models/user');
const bcrypt = require('bcrypt');

const getme = async (req, res) =>{
    return res.json({user : req.user})
};

// PUT /api/users/me

const updateProfile = async (req, res) => {
    try{
        const {name, email} = req.body;

        if (!name || !email) {
            return res.status(400).json({message : 'Nothing to Update !!!'})
        }
        const user = await userModel.findById(req.user._id);
        if (!user) return res.status(404).json({message : 'User Not Found !'});

        if (name) user.name = name;

        if (email && email !== user.email){ //email && = user actually gave a new email in the request.
            // while email !== user.email = if the new email user gave is different from the old email.
            //Only continue if a new email was provided AND it’s not the same as the old one
            const exists = await userModel.findOne({email}); //if Is there already another user with this new email?
            if (exists && exists._id.toString() !== req.user._id.toString()){ //exists → means some user already has that email. exists._id.toString() !== req.user._id.toString() → but we also need to check: Is that someone a different person, or is it you?
                return res.status(400).json({message: 'Email already in use'}); //If this email belongs to some other user, stop and say ‘Email already in use’.
            }
            user.email = email;
        }

        await user.save();
        const safeUser = user.toObject();
        delete safeUser.password;

        return res.json({message : 'Profile Update', user: safeUser});
    } catch(err){
        console.error('Update profile error:', err.message);
        return res.status(500).json({message: 'Server Error'});
        
    }
};


// PUT /api/users/me/password

const changePassword = async(req, res) => {
    try {
        const {currentPassword, newPassword} = req.body;
        if (!currentPassword || !newPassword){
            return res.status(400).json({message: 'Current and new password are required'});
        }

        const user = await userModel.findById(req.user._id);
        if (!user) return res.status(404).json({message: 'User not Found !'});

        const ok = await bcrypt.compare(currentPassword, user.password); //bcrypt.compare is like asking a locksmith: “Does the password they typed match the secret locked password in the database?”
        if (!ok) return res.status(400).json({message : 'Current password is wrong !'})


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        return res.json({message : 'Password Updated !'});
    } catch (err){
        console.error('Change password error:', err.message);
        return res.status(500).json({message : 'Server error'});       
    }
};


const getAllUsers = async(req, res)=> {
    try{
        const users = await userModel.find().select('-password');
        return res.json(users);
    } catch(err){
        console.error("Get all users error:", err.message);
        return res.status(500).json({message: 'Server Error'});
        
    }
}

module.exports = {getme, updateProfile, changePassword, getAllUsers};
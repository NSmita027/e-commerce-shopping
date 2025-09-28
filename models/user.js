const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String, required : true, trim : true
    },

    email : {
        type : String, required : true, trim : true, lowercase : true, unique: true
    },

    password : {
        type: String, required: true, minlength : 6
    },

    role: {
        type: String, enum : ['user', 'admin'], default: 'user'
    }
},
    {timestamps : true}
);

module.exports = mongoose.model('User', userSchema);
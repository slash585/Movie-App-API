const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        maxlength:20,
        minlength:1
    },
    password:{
        type:String,
        unique:true,
        minlength:5
    }
})

module.exports = mongoose.model('user',UserSchema);
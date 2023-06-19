const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    username:{
        type:String,
        required:[true, 'username is required'],
        unique:true
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        min: [4, 'Password length must be greater than 4']
    }
})

const User = mongoose.model('User',UserSchema)

module.exports = User
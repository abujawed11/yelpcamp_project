// const { application } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const myError = require('../utils/myError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const fetchuser = require('../utils/middleware')

//serect code for using Token
const JWT_SECRET = 'yelp@camp#udemy!!'

//Test
router.get('/login',(req,res) => {
    res.send('Login')
})

//Sign-Up route
router.post('/signup',catchAsync( async (req,res) => {
    const {username,email,password} = req.body
    const searchUser = await User.findOne({$or:[{username:username},{email:email}]})
    if(searchUser){
        throw new myError('The username or email already exist',400)
    }
    // console.log(searchUser)
    // res.send('ok')
    const hashPass = await bcrypt.hash(password.toString(),12)
    const newUser = new User({username,email,password:hashPass})
    const saveUser = await newUser.save()

    const data = {
        user: {
            id: newUser.id,
            user: newUser.username
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    //returning Token to user
    res.json({success:true, Token: authToken })
}))

//Login route
router.post('/login',catchAsync( async (req,res) => {
    const {username,password} = req.body
    const user = await User.findOne({username})
    if(!user){
        throw new myError('Incorrect credentials',404)
    }
    const pass = await bcrypt.compare(password,user.password)
    if(!pass){
        throw new myError('Incorrect credentials',404)
    }

    const data = {
        user: {
            id: user.id,
            user: user.username
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET)

     //returning Token to user
     res.json({success: true, Token: authToken, userData: user})

}))

//getting
router.post('/userdetails',fetchuser,catchAsync(async(req,res) => {
    const id = req.user.id
    const user = await User.findById(id).select("-password")
    res.json({success: true, userData: user})
}))




module.exports = router
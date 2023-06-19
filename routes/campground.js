const express = require('express')
const router = express.Router()
const Campground = require('../models/campground')
const myError = require('../utils/myError')
const catchAsync = require('../utils/catchAsync')
const Review = require('../models/review')
const fetchuser = require('../utils/middleware')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'yelp@camp#udemy!!'

//fecth
router.get('/campgrounds', catchAsync(async (req, res) => {
    const camps = await Campground.find({})
    res.json({ success: true, data: camps })
}))

//Add
router.post('/campgrounds', fetchuser, catchAsync(async (req, res) => {
    const { title, location, image, price, description } = req.body
    if (!title || !location || !image || !price || !description) {
        throw new myError('One or more field is missing', 400)
    } else if (price < 0) {
        throw new myError('Price must be positive', 400)
    }
    const newCamp = new Campground(req.body)
    // newCamp.author = req.user.id
    await newCamp.save()
    res.json({ success: true, data: newCamp })
}))

// fetch by Id
router.get('/campgrounds/:id',catchAsync( async(req,res) => {
    const campground = await Campground.findById(req.params.id)
    // const user = campground.author
    res.json({success:true,data:campground})
}))


// router.get('/campgrounds/:id',catchAsync( async (req, res) => {

//     const token = req.header('auth-token')
//     let userType = 'anyone'
//     if (token) {
//         const data = jwt.verify(token, JWT_SECRET)             //verifying token with JWT to check the logged in userId
//         const userId = data.user.id;                           // here we got the logged in userId
//         const { id } = req.params                              //this is the id of campground we will get when user clicks on any campground
//         const campground = await Campground.findById(id).populate('author')
//         const user = campground.author
//         // console.log(userId)
//         // console.log(campground.author._id.valueOf())
//         // const user = campground.author
//         // console.log(campground)
//         // console.log(campground.author._id.valueOf() === userId)
//         if (campground.author._id.valueOf() === userId) {
//             userType = 'same'
//             res.json({ success: true, data: campground, user, Type: userType })
//         } else {
//             userType = 'diff'
//             res.json({ success: true, data: campground, user, Type: userType })
//         }

//     }
//     else {
//         // res.send('without token')
//         const campground = await Campground.findById(req.params.id).populate('author')
//         const user = campground.author
//         res.json({ success: true, data: campground, user, Type: userType })
//     }
//     // if (campground.author._id.valueOf() === userId) {

//     // }


//     // res.send('ok')

// }))


//update
router.put('/campground/:id', fetchuser, catchAsync(async (req, res) => {
    const { title, location, image, price, description } = req.body
    if (!title || !location || !image || !price || !description) {
        throw new myError('One or more field is missing', 400)
    }
    const { id } = req.params
    const camp = await Campground.findById(id)
    // console.log(req.user.id)
    // console.log(camp.author.valueOf())
    if(camp.user !== req.user.user){
        throw new myError('You dont have permisiion')
    }
    // console.log(req.user)
    // console.log(camp.user)
    const updatedCamp = await Campground.findByIdAndUpdate(id, { ...req.body }, { new: true })
    res.json({ success: true, data: updatedCamp })
}))

//Delete a campground with all its refrence reviews
router.delete('/campground/:id', fetchuser, catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id)
    if (camp.reviews.length) {
        const review = await Review.deleteMany({ _id: { $in: camp.reviews } })
    }
    await Campground.findByIdAndDelete(req.params.id)
    res.json({ success: true, data: camp })

}))

module.exports = router
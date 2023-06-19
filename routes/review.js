const express = require('express')
const router = express.Router({ mergeParams: true })
const Campground = require('../models/campground')
const myError = require('../utils/myError')
const catchAsync = require('../utils/catchAsync')
const Review = require('../models/review')
const fetchuser = require('../utils/middleware')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'yelp@camp#udemy!!'



//Post Review
router.post('/campground/:id/reviews', fetchuser, catchAsync(async (req, res) => {
    // res.send('Made it')
    const camp = await Campground.findById(req.params.id)
    const review = new Review(req.body)
    // review.author = req.user.id
    camp.reviews.push(review)
    await camp.save()
    await review.save()
    res.json({ success: true, data: review })
}))

// Get Review
router.get('/campground/:id/reviews', catchAsync(async (req,res) => {
    // const camp = await Campground.findById(req.params.id).populate('reviews').populate('author')
    const camp = await Campground.findById(req.params.id).populate('reviews')
    res.json({success:true,data:camp})
}))

// router.get('/campground/:id/reviews', catchAsync(async (req, res) => {
//     const camp = await Campground.findById(req.params.id).populate({
//         path: 'reviews',
//         populate: {
//             path: 'author'
//         }
//     }).populate('author')
//     // revAuthorId = camp.reviews.author.id;
//     console.log(camp.reviews)
//     res.json({ success: true, data: camp })
// }))



//Get review userId
// router.get('/campground/:id/reviews', catchAsync(async (req, res) => {
//     const token = req.header('auth-token')
//     const { id } = req.params
//     // let userType = 'anyone'
//     if (token) {
//         const data = jwt.verify(token, JWT_SECRET)                               //verifying token with JWT to check the logged in userId
//         const userId = data.user.id;                                             // here we got the logged in userId
//         //this is the id of campground we will get when user clicks on any campground
//         // const revUser = await Review.findById(reviewsId).populate('author')
//         const camp = await Campground.findById(id).populate('reviews')
//         const campRev = camp.reviews
//         const revUser = await Review.find({ $and: [{ author: userId }, { _id: { $in: campRev } }] }).populate('author')
//         const otherUser = await Review.find({ $and: [{ author: { $nin: userId } }, { _id: { $in: campRev } }] }).populate('author')
//         // console.log(revUser)
//         // console.log('--------------------------------')
//         // console.log(otherUser)
//         // const revUser = await Review.find({author: userId})
//         // const otherUser = await Review.find({author: {$nin: userId}})
//         // user = revUser.author
//         res.json({ success: true, LoggedIn: revUser, other: otherUser })
//         // res.send('ok')

//     } else {
//         const camp = await Campground.findById(req.params.id).populate({
//             path: 'reviews',
//             populate: {
//                 path: 'author'
//             }
//         }).populate('author')
//         res.json({ success: true, data: camp.reviews})

//     }



    // console.log(revUser)
    // console.log('---------------------------')
    // console.log(otherUser)
    // res.send('ok')
    // console.log(revUser.author._id.valueOf() === userId)
    // console.log(revUser.author._id.valueOf())
    // console.log(userId)
    //     if (revUser.author._id.valueOf() === userId) {
    //         userType = 'same'
    //         res.json({ success: true, data: revUser, user, Type: userType })
    //     } else {
    //         userType = 'diff'
    //         res.json({ success: true, data: revUser, user, Type: userType })
    //     }
    // } else {
    //     const revUser = await Review.findById(reviewsId).populate('author')
    //     res.json({ success: true, data: revUser, user, Type: userType })
    // }


// }))


//Delete All review from a particular Campground
router.delete('/campground/:id/reviews/', async (req, res) => {
    const { id } = req.params
    const camp = await Campground.findByIdAndUpdate(id, { $set: { reviews: [] } })
    res.send('deleted')
})

//Delete a single review from Campground with its refrence
router.delete('/campground/:id/reviews/:reviewsId', catchAsync(async (req, res) => {
    const { id, reviewsId } = req.params
    const camp = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewsId } })
    const review = await Review.findByIdAndDelete(reviewsId)
    res.json({ success: true, data: review })
    // res.send('deleted')
}))

module.exports = router
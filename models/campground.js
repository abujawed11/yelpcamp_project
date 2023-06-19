const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CampgroundSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    // author:{
    //     type:Schema.Types.ObjectId,
    //     ref:'User'
    // },
    user: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]

})

module.exports = mongoose.model('Campground', CampgroundSchema)
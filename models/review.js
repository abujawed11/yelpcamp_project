const mongoose = require('mongoose')
const {Schema} = mongoose


const reviewSchema = new Schema({
    body:{
        type:String,
        required:true
    },
    rating: {
        type:Number,
        required:true,
        min: 0,
        max: 5
    },
    user:{
        type:String,
        required: true
    }
    // author:{
    //     type:Schema.Types.ObjectId,
    //     ref:'User'
    // }
})

module.exports = mongoose.model('Review',reviewSchema)
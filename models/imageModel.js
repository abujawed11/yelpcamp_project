const mongoose = require('mongoose')
const {Schema} = mongoose

const imageSchema = new Schema({
    image: String
})

const Image = mongoose.model('Image',imageSchema)
module.exports = Image
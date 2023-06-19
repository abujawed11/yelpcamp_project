const mongoose = require('mongoose')
const Campground = require('../models/campground')
const mongoURI = 'mongodb://127.0.0.1:27017/yelp-camp'
const cities = require('./cities')
const {places,descriptors,images} = require('./seedHelpers')
mongoose.connect(mongoURI,()=>{
    console.log('Connected to MongoDB!')
})


const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({})
    // const seed = new Campground({title: 'purple camp'})
    for(let i=0;i<50;i++){
        const Random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 100)
        const camp = new Campground({
            user:'abujawed',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[Random1000].city}, ${cities[Random1000].state}`,
            image: `${sample(images)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi aut corrupti dolore quibusdam quod rem eligendi similique perspiciatis dicta iure?',
            price
        })
        await camp.save()
    }
    

}

seedDB().then(()=>{
    mongoose.connection.close();
})
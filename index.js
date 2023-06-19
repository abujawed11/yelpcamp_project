require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const myError = require('./utils/myError')
const campRoute = require('./routes/campground')
const reviewRoute = require('./routes/review')
const userRoute = require('./routes/userRoute')
const imageFetch = require('./routes/imageFetch')
const session = require('express-session')
const imageModel = require('./models/imageModel')
const path = require('path')
const PORT = process.env.PORT || 5000

//Connecting to Dbs
const mongoURI = 'mongodb://127.0.0.1:27017/yelp-camp'
mongoose.connect(mongoURI,()=>{
    console.log('Connected to MongoDB!')
})



// app.use(session({
//     secret: 'myCamp#react@Udemy',
//     resave: false,
//     saveUninitialized: true,
//     cookie:{
//         // expires: Date.now() + 1000 * 60 * 60 * 24,
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }))

//middleware
const corsOptions = {
    origin: "http://localhost:3000", //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(express.json());
// app.use(session())
app.use(session({
    secret: 'myCamp#react@Udemy',
    resave: false,
    saveUninitialized: false,
    cookie:{
        // expires: Date.now() + 1000 * 60 * 60 * 24,
        // httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax',
        secure: false

    }
}))

// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

// app.use(express.static(path.join(__dirname,'../build')))


//Setting session config
const sessionConfig = {
    secret: 'myCamp#react@Udemy',
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 1000 * 60 * 60 * 24,   //Date.now() gives current time in millisecond. So, Date.now() + 1000 * 60 * 60 * 24 means current time + one day
        maxAge: 1000 * 60 * 60 * 24
    }
}


// app.get(/^(?!\/api).+/,(req,res) => {
//     res.sendFile(path.join(__dirname,'../build/index.html'))
// })

//Defining routes
//camp route
app.use('/',campRoute)
//review route
app.use('/',reviewRoute)
//user toute
app.use('/',userRoute)
//getImage
// app.use('/',imageFetch)



//Home
// app.get('/',(req,res) => {
//     res.send('Home')
// })


//--------------------------------------------

// const fetchImage = async () => {
//     const url = `https://api.unsplash.com/collections/429524?client_id=${process.env.UNSPALSH_API_KEY}`
//     const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             // 'auth-token': auth
//         }
//     });
//     const res = await response.json()
//     console.log(res)
// }

// fetchImage()
 


//for all other
app.all('*',(req,res,next) => {
    next(new myError('Page not found',404))
})

//Error hadling middleware
app.use((err,req,res,next) => {
    const {message = 'Somthing went wrong',status=500,name} = err
    res.status(status).json({success:false,status: status,type:name,error: message})
})


if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


//express start
app.listen(PORT,() => {
    console.log('Listening at 5000')
})
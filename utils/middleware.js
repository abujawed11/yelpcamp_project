const myError = require('./myError')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'yelp@camp#udemy!!'

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and add id to req object
    const token = req.header('auth-token')
    if (!token) {
        // res.status(401).send({ error: "Please Login to continue" })
        throw new myError('Please Login to continue',401)
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next()

    } catch (error) {
        throw new myError('Please authenticate using a valid token',401)
        // res.status(401).send({ error: "Please authenticate using a valid token" })
        
    }

}

module.exports = fetchuser;
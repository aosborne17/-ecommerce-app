import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'


// Remember we must always call next in our middleware

const protect = asyncHandler(async(req, res, next) => {
    let token

    // We are doing a check to see if the token is present
    // We also want to make sure it starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            // We must get the actual token from the header and thus we must remove the Bearer part
            // to do this we split the string at the whitespace and return the second half of the string
            token = req.headers.authorization.split(' ')[1]
            

            // Now we can decode the token
            // This will give us id of our user aswell as we have added it to our token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // we can now query our database and return the user that is in our token, by their id
            // The select allows us to remove the password field from the User as there is no need to pass it in here
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch(error) {
            res.status(401)
            throw new Error('Not Authorized, Invalid Token')
        }

    }

    // This will handle there being no token
    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, No Token In Header Present')
    }

})

export {
    protect,

}
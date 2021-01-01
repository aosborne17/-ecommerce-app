import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


// @description  Auth the user & get web token
// @route  POST /api/users/login
// @access Public


const authUser = asyncHandler(async (req, res) => {
    // We want to retrieve the data from the body of the form request that we receive when a user logs in
    const {email, password} = req.body

    // Here we want to find one document in the users model where the email is equal to the email from the post request
    const user = await User.findOne({email:email})

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        // 401 means unauthorized, thus the user entered the incorrect creds
        res.status(401)
        throw new Error('Invalid email or password')
    }
})



// @description  Get user profile
// @route  GET /api/users/profile
// @access Private


const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        // res.json(req.user)  // Note that this would also work as we already have the info from the database in our request
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    authUser,
    getUserProfile
}




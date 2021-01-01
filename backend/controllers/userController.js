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




// @description  Register new user
// @route  POST /api/users
// @access Public


const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email:email})

    // If they try to register with a email that is already in our database we will return an error
    if (userExists) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    // If the email isn't in our database, then we will go ahead and create a new user document
    // We will pass in the information that we receive from the post request
    // We will also make sure to hash the password before it is saved to the db
    const user = await User.create({
        name: name,
        email: email,
        password: password,
    })

    if (user) {
        // 201 means something was created
        res.status(201)
        // After we create the user, we then return the data so we can authenticate them and log them in
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
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
    registerUser,
    getUserProfile,
}




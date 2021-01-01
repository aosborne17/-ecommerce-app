import express from 'express'
const router = express.Router()
import {authUser, registerUser, getUserProfile} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'


// This will allow a user to be registered
router.post('/', registerUser)

router.post('/login', authUser)

// This will take us to the profile of the signed in user

router.get('/profile', protect, getUserProfile)

export default router
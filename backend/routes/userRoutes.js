import express from 'express'
const router = express.Router()
import {authUser, getUserProfile} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'



router.post('/login', authUser)

// This will take us to the profile of the signed in user

router.get('/profile', protect, getUserProfile)

export default router
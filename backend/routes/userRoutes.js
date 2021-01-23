import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUserById,
  getUserById,
  updateUserById,
} from '../controllers/userController.js';
import { adminCheck, protect } from '../middleware/authMiddleware.js';

// This will allow a user to be registered
router.post('/', registerUser);

// Allows us to get all users, only admins will be able to access this route
// we are passing in two middlewares, the first will get the id of the user
// the second will use the id of the user to check whether they are an admin or not
router.get('/', protect, adminCheck, getUsers);

router.post('/login', authUser);

// This will take us to the profile of the signed in user

router.get('/profile', protect, getUserProfile);

router.put('/profile', protect, updateUserProfile);

// this is our route to delete a user by their id that is passed in through the route params
router.delete('/:id', protect, adminCheck, deleteUserById);

router.get('/:id', protect, adminCheck, getUserById);

router.put('/:id', protect, adminCheck, updateUserById);

export default router;

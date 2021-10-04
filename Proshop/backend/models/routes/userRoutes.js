import express from 'express'
import { authUser, updateUserProfile, registerUser, userProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, userProfile).put(protect, updateUserProfile)

export default router

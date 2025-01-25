import express from 'express'
import { registerUser,authUser,allUsers} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router=express.Router();

router.route('/').post(registerUser)
router.post('/login', authUser)
// router.route('/login').post(authUser);
router.route('/').get(protect,allUsers);

export default router
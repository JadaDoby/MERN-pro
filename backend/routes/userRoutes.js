import express from 'express';
const router=express.Router();
import {authUser,
    registeUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser} from '../controllers/userControllerControllers';
import {protect,admin} from '../middleware/authMiddleware.js';

router.route('/').post(registeUser).get(protect,admin,getUsers);
router.post('/logout',logoutUser);
router.post('/auth',authUser);
router.route('/profile',).get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect,admindeleteUser).get(protect,admin,getUserByID).put(protect,admin,updateUser);




export default router;

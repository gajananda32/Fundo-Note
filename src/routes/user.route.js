import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { resetAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to create a new user
router.post('/register', newUserValidator, userController.newUser);

//route to loginuser
router.post('/loginuser',userController.userlogin);  

//route to forgottPassword
router.post('/forgottpassword',userController.forgotPassword);

//route to resetPassword
router.put('/resetpassword',resetAuth,userController.ResetPassword);

export default router;

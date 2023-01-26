import express from 'express';
import { signup, signin, showUsers, updateUser, contactUs, verification } from '../controllers/users.controller.js';
import { protectRoute } from '../utils/protect_route.js';
import { userValidation } from '../utils/validations/user.validation.js'
import upload from "../config/multer.js";

const router = express.Router();

/** sign up */
router.route('/signup')    //http://localhost:5000/api/signup POST body {name: ,username: , email:, password:}
    .post( upload.single("userPic"),userValidation, signup);

/** sign in */
router.route('/signin').post(signin);

/** display users */
router.route('/all').get(showUsers)

/** update */
router.route('/user/:uid')
    .patch(protectRoute, updateUser);

    router.post("/contactus", contactUs);


// /** send email */
// router.route('/email')
//     .post(sendEmail);


/** verify account */
router.route('/verify/email/:userid/:verifytoken')
    .get(verification);



export default router;
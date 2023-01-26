import express from 'express';
import { getProducts, createProduct } from '../controllers/products.controller.js';
// import { protectRoute, restrictTo } from '../middlewares/auth.middleware.js';


const router = express.Router();

/** create and getAll */
router.route("/")
    .get(getProducts)
    //protect route removed for testing
    // .post(protectRoute, restrictTo('admin'), createProduct);

    .post(createProduct);


// /** update and delete products */
// router.route('/:pid')
//     .patch(protectRoute,)
//     .delete(protectRoute,);



export default router;
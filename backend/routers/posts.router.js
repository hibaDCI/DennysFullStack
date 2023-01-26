import express from "express";
// import passport to use it as a middleware
import passport from "passport";
import {createPost} from "../controllers/posts.controller.js";

const router = express.Router();
// using the passport as middleware before the createController
router.post(
  "/create",
  passport.authenticate("jwt", {session: false}),
  createPost
);

export default router;

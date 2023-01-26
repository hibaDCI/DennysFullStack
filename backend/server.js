import express from "express";
import dotenv from "dotenv";
// using passport authenticate
import passport from "passport";
import createError from "http-errors";
import { connectToDB } from "./utils/db_config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routers/user.router.js";
import productRouter from "./routers/products.router.js";
import postRouter from "./routers/posts.router.js";
import configureJwtStrategy from "./middleware/passport-jwt.js";

const app = express();
dotenv.config();

/** DB CONNECTION */
connectToDB();

//serve the frontend pix from uploads
app.use("/uploads", express.static("uploads"));

/** MIDDLEWARES */
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//! use passport and initialize
app.use(passport.initialize());
//! call the passport configuration

configureJwtStrategy(passport);

/** ROUTERS */
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/posts", postRouter);

/** ERROR HANDLERS */
//404
app.use((req, res, next) => {
  next(createError(404, "Error 404: Route is not defined..🤨"));
});

//MAIN ERROR HANDLER
app.use((error, req, res, next) => {
  if (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message,
        stack: error.stack,
      },
    });
  }

  next();
});

/** SET PORT NUMBER */
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is up on port ${port} 👻`));

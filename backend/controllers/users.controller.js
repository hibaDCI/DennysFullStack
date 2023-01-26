import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import crypto from "crypto";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { User } from "../models/users.model.js";
import { VToken } from "../models/tokens.model.js";
//use sendgrid
import sgMail from "@sendgrid/mail";
import { verify_message } from "../utils/template2.js";
import { send_verify_email, transporter } from "../utils/mail_verification.js";

dotenv.config();

/* -------------------------------------------- */
/*                    SIGN-UP                   */
/* -------------------------------------------- */
export const signup = async (req, res, next) => {
  console.log(req.body);
  try {
    //validation results handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send({ message: "invalid data", errors: errors.array() });
    }

    //destructure the request body
    const { fullname, email, password, confirm } = req.body;

    if (!password || !fullname || !email || !confirm) {
      return next(
        createError(400, `Please fillout the required (*) fields for sign-up!`)
      );
    }

    //create the user
    const newUser = await User.create({
      fullname,
      email,
      password,
      userPic: "/uploads/images/" + req.file.filename,
    });

    let token;
    if (newUser) {
      token = jwt.sign({ userid: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      //remove password from result set (to avoid send it to frontend)
      newUser.password = undefined;
    }

    /**
     * For email verification
     * 1. create a random token and insert it into db
     * 2. create a model for token that contains tokens owner and token itself
     * 3. send a link to front end that contains the userid and the random token    http://localhost:5000/api/verify/userid/verificationtoken
     * 4. when the user clicks on the link our backend receive another request for verification so defin route for it
     * 5. verfication controller should check the user id and random token
     * 6. if userid and token are valid user if verified and token can be deleted
     */

    //create random token for email verification
    //insert random token to db
    const verification_token = await VToken.create({
      uid: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    //verify link that will send to new user's email address. e.g.    http://localhost:5000/api/verify/userid/verificationtoken
    const verifyLink = `${process.env.BASE_URL}/api/auth/verify/${newUser._id}/${verification_token.token}`;

    console.log(verifyLink);

    //send email
    // await transporter.sendMail({
    //   from: "denis.mcardle@dci.education",
    //   to: email,
    //   subject: "Welcome to our App!",
    //   html: send_verify_email(verifyLink, newUser.name), //verify_message() will return a html template contains verify_link and name of the user
    // });
    send_verify_email(
      "denis.mcardle@dci.education",
      newUser.email,
      "Welcome to our App!",
      newUser._id,
      newUser.fullname
    );

    //send response
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ message: "create new user", data: newUser });
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------------------------------- */
/*                        EMAIL VERIFICATION                        */
/* ---------------------------------------------------------------- */
export const verification = async (req, res, next) => {
  try {
    const { userid, verifytoken } = req.params;

    //check the userid
    const user = await User.findById(userid);
    console.log("user i found", user);
    if (!user)
      return next(createError(400, "Inavlid Link because of wrong userid."));

    const tokenInDB = await VToken.findOne({ uid: userid, token: verifytoken });
    console.log("token", tokenInDB);
    if (!tokenInDB)
      return next(
        createError(
          400,
          "Invalid Link because of wrong userid and verify token"
        )
      );

    await User.findByIdAndUpdate(userid, { isVerified: true });
    await VToken.findByIdAndDelete(tokenInDB._id);

    res.send("You verified successfully!");
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------- */
/*                    SIGN-IN                   */
/* -------------------------------------------- */
export const signin = async (req, res, next) => {
  try {
    //destructure the body
    const { email, password } = req.body;

    //if email or password not exist
    if (!email || !password) {
      return next(
        createError(400, "Please provide email and password for login")
      );
    }

    //1. find a user with given email
    const user = await User.findOne({ email }).select("+password");

    //2. compare given password with hashed value
    if (user && (await user.checkPassword(password, user.password))) {
      //create the token
      const token = jwt.sign(
        { userid: user._id }, //payload
        process.env.JWT_SECRET, //secret key
        { expiresIn: "1d" } //expiration
      );

      user.password = undefined; //remove password (shouldn't send password to frontend)

      res
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "none",
        // 1- sameSite:false,
        
        // 2- I used axios utils
        
        // 3- I also used CRA and not vite
        
        // all work now
          expires: new Date(Date.now() + 3600_000 * 24 * 30),
        })
        .send({
          status: "success",
          message: "Logged In successfully!",
        });
    } else {
      res.status(401).send({
        status: "Login failure",
        message: "Email or password is not valid.",
      });
    }
  } catch (error) {
    next(error);
  }
};

/* -------------------------- UPDATE USER ------------------------- */
export const updateUser = async (req, res, next) => {
  try {
    let updatedUser;
    if (req.body.password) {
      const hashedPass = await bcrypt.hash(req.body.password, 12);
      updatedUser = await User.findByIdAndUpdate(
        req.params.uid, //updated user
        { ...req.body, password: hashedPass, changedAt: Date.now() }, //updating data
        { new: true } //return updated data
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        req.params.uid,
        { ...req.body },
        { new: true }
      );
    }

    res.send({ message: "user updated", data: { updatedUser } });
  } catch (error) {
    next(error);
  }
};

// show all users

export const showUsers = async (req, res, next) => {
  const allUser = await User.find();

  console.log(allUser);

  console.log(req.cookies);
  res.status(200).json({ msg: "here we go", allUser });
};

// /* ---------------------------------------------------------------- */
// /*                         send simple email                        */
// /* ---------------------------------------------------------------- */
// export const sendEmail = async (req, res, next) => {
//     try {

//         //get info (subject, receiver, message)
//         const { subject, receiver, message } = req.body;

//         //send email
//        await transporter.sendMail({
//             to: receiver,
//             from: 'denis.mcardle@dci.education',
//             subject: subject,
//            html: message,

//        });

//         res.send("Email sent!")

//     } catch (error) {
//         next(error)
//     }
// };

//! send email by sendGrid when the user contact us

export const contactUs = async (req, res, next) => {
  const { username, email, message } = req.body;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    from: "denis.mcardle@dci.education",
    to: email,
    subject: message,
    text: "very simple email sys ",
    html: `<strong>Hello there ${username}</strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("msg sent");
      res.json({ msg: "Email Successfully sent! Thanks." });
    })
    .catch((err) => console.log(err));
};

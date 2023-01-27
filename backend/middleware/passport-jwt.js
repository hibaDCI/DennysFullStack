import passportJWT from "passport-jwt";
import { User } from "../models/users.model.js";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt; // we will not use this because our token is in req.cockies

const configureJwtStrategy = (passport) => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        // where is our token located
        jwtFromRequest: (req) => req.cookies.access_token,

        secretOrKey: process.env.JWT_SECRET,
      },
      (jwtPayload, done) => {
        // here is called serialize and deserialize
// here is the second error , you tried to find the id from the payload (id) but when you created the payload in userController you called it userid
       // therefore it sould be like this
        return User.findById(jwtPayload.userid)
        
//         return User.findById(jwtPayload.id)

          .select("_id")
          .then((user) => {
            // attach the user object (_id of the user) to the req object
            return done(null, user);
          })
          .catch((err) => done(err));
      }
    )
  );
};

export default configureJwtStrategy;

import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "../model/user.model";
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

export default function configurePassport(passport: passport.PassportStatic): void {
  passport.use(
    new JWTStrategy(
      {
        secretOrKey: process.env.JWT_SECRET || "default-secret",
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "signup",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email", passwordField: "password" },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name } = req.body;
          const user = await UserModel.create({ first_name, last_name, email, password });
          return done(null, user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          console.log(user);
          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          const validate = await user.isValidPassword(password);

          if (!validate) {
            return done(null, false, { message: "Wrong password" });
          }

          return done(null, user, { message: "Logged in successfully" });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model";

const authRouter = express.Router();

// Signup route
authRouter.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new userModel({ first_name, last_name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
});

// Signin route
authRouter.post("/signin", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("login", { session: false }, (err: Error, user: any, info: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        return next(error);
      }

      // Generate a JWT token
      const body = { _id: user._id, email: user.email }
      const token = jwt.sign({ user: body }, process.env.JWT_SECRET || "default-secret");

      res.json({ token });
    });
  })(req, res, next);
});

export default authRouter;

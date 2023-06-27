import { Request, Response, NextFunction } from "express";
import userModel from "../model/user.model";


export const getUserURLs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user ? req.user : null;
    console.log(user);

    // Find the user and populate the 'urls' field
    const User = await userModel.findById(user).populate("urls");

    console.log(User);

    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the URLs from the user object
    const urls: any = User.urls;

    // Extract specific information from each URL object
    const urlInfo = urls.map((url: any) => {
      return {
        originalURL: url.originalURL,
        shortUrl: url.shortUrl,
        createdAt: url.createdAt,
        clicks: url.clicks,
        referringSources:url.referringSources,
        lastClickedAt:url.lastClickedAt
      };
    });

    console.log(urls);

    res.json({ urlInfo });
  } catch (error) {
    next(error);
  }
};

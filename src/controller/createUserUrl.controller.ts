import { Request, Response } from "express";
import shortUrl from "../model/url.model";
import { validateURL } from "../utils/validateUrl";
import userModel from "../model/user.model";
import { customAlphabet } from "nanoid";


// Generate custom ID
const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  3
);

export async function createUserUrl(req: Request, res: Response) {
  try {
    //get original url from request body
    const { originalURL } = req.body;
    console.log(originalURL);

    const userDetails = req.user ? req.user : null;

    const hostUrl = "http://localhost:2020";

    // check if url is valid
    const isValidUrl = validateURL(originalURL);

    if (isValidUrl) {
      //shorten url and return to clients
      const shortId = nanoid();
      const completeUrl = `${hostUrl}/${shortId}`;
      const shortenedUrl = new shortUrl({ originalURL, shortUrl: completeUrl, shortId });
      console.log(shortenedUrl)
      await shortenedUrl.save();

      // Associate the URL with the user
      const user = await userModel.findById(userDetails);
      if (user) {
        user.urls.push(shortenedUrl._id);
        await user.save();
      }

      return res.send(completeUrl);
    }
    res.send("Invalid URL");
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal error" });
  }
}

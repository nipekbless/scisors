import { Request, Response } from "express";
import ShortURL from "../model/url.model";

export async function redirectURL(req: Request, res: Response) {
  try {
    const {url} = req.params;

    //find corresponding original url from database

    const shortenedUrl = await ShortURL.findOne({ shortUrl:url });
    console.log(shortenedUrl)
    if (!shortenedUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    //perform the redirect
    res.redirect(shortenedUrl.originalURL);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal error" });
  }
}

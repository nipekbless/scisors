import { Request, Response } from "express";
import ShortURL from "../model/url.model";

export async function redirectURL(req: Request, res: Response) {
  try {
    const { url } = req.params;

    //find corresponding original url from database

    let shortenedUrl = await ShortURL.findOne({ shortUrl: url });

    if (!shortenedUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    // capture the referring source if available
    const referringSource = req.headers.referer || "Direct";

    // push the referring source to the array
    shortenedUrl.referringSources.push(referringSource);

    // Update the click count and last clicked time
    shortenedUrl.clicks = Number(shortenedUrl.clicks) + 1;
    shortenedUrl.lastClickedAt = new Date();
    await shortenedUrl.save();
    
    //perform the redirect
    res.redirect(shortenedUrl.originalURL);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal error" });
  }
}

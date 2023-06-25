import { Request, Response } from "express";
import shortUrl from "../model/url.model";

export async function customShortUrl(req: Request, res: Response) {
  const targetUrl = req.params;
  const customUrl = req.body.customUrl;
  try {
    // search the database for target short URL data and replace with the custom url
    const updatedShortUrl = await shortUrl.findOneAndUpdate(
      targetUrl,
      { shortUrl: customUrl },
      { new: true }
    );
    if (!updatedShortUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json(updatedShortUrl);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal error" });
  }
}

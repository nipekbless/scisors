import { Request, Response } from "express";
import shortUrl from "../model/url.model";

export async function getAllUrl(req: Request, res: Response) {
  try {
    // get all url data from the database
    const allUrl = await shortUrl.find();

    // Extract all shortURL values from the documents in database
    const shortURLs = allUrl.map((url) => {
      return {
        url: url.shortUrl,
        timeCreated: url.createdAt,
      };
    });

    res.json(shortURLs);
    console.log(shortURLs);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal error" });
  }
}

import { Request, Response } from "express";
import shortUrl from "../model/url.model";

export async function getOneUrl(req: Request, res: Response) {
  try {
    // get desired url analytics from the database
    const desUrl = req.params;
    const url = await shortUrl.findOne(desUrl);

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Extract and send the analytics data to the client
    const { clicks, lastClickedAt, referringSources } = url;
    res.json({
      clicks,
      lastClickedAt,
      referringSources,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal error" });
  }
}

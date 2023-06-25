import { Express, Request, Response ,NextFunction } from "express";
import { shortenUrl } from "../controller/createShortUrl.controller";
import { redirectURL } from "../controller/redirect.controller";
import { getAllUrl } from "../controller/getAllUrl.controller";
import { getOneUrl } from "../controller/getOneUrl.controller";
import { generateQrCode } from "../controller/genQrCode.controller";
import { customShortUrl } from "../controller/customShortUrl.controller";
import limiter from '../middleware/rateLimiting';




function routes(app: Express) {

  app.get("/test", (req: Request, res: Response) => {
    return res.send("App is okay");
  });

  app.post("/shorten", shortenUrl);

  app.get("/redirect/:url", redirectURL);

  app.get("/geturls",limiter, getAllUrl);

  app.get("/analytics/:shortUrl", getOneUrl);

  app.get("/qrcode/:shortUrl", generateQrCode);

  app.put("/customurl/:shortUrl", customShortUrl);

  // Error handling 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Rate limiting error:', err);
  res.status(429).json({ error: 'Too many requests, please try again later.' });
})
}

export default routes;

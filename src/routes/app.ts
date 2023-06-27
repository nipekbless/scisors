import { Express, Request, Response, NextFunction } from "express";
import { shortenUrl } from "../controller/createShortUrl";
import { redirectURL } from "../controller/redirect.controller";
import { generateQrCode } from "../controller/genQrCode.controller";
import { customShortUrl } from "../controller/customShortUrl.controller";
import { getUserURLs } from "../controller/getUserUrls.controller";
import { createUserUrl } from "../controller/createUserUrl.controller";
import limiter from "../middleware/rateLimiting";
import path from "path";
import passport from "passport"

function routes(app: Express) {
  app.get("/test", (req: Request, res: Response) => {
    return res.send("App is okay");
  });

  app.post("/Api/shorten", shortenUrl);

  app.post("/Api/shortenurl", passport.authenticate("jwt", { session: false }), createUserUrl);

  app.get("/:url", redirectURL);

  app.get("/qrcode/:shortUrl",passport.authenticate("jwt", { session: false }), generateQrCode);

  app.put("/customurl/:shortUrl",passport.authenticate("jwt", { session: false }), customShortUrl);

  app.get("/Api/getuserurls", passport.authenticate("jwt", { session: false }), getUserURLs)

  // Route for serving the HTML file
  app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '../../public/index.html');
    res.sendFile(indexPath);
  });
  
  // Error handling
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Rate limiting error:", err);
    res
      .status(429)
      .json({ error: "Too many requests, please try again later." });
  });
}

export default routes;

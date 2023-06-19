import { Express, Request, Response } from "express";
import { shortenUrl } from "../controller/shortUrl.controller";
import { redirectURL } from "../controller/redirect.controller";

function routes(app: Express) {
  app.get("/test", (req: Request, res: Response) => {
    return res.send("App is okay");
  });

  app.post("/shorten", shortenUrl);

  app.get("/:url", redirectURL);
}

export default routes;

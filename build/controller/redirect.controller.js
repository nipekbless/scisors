"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectURL = void 0;
const url_model_1 = __importDefault(require("../model/url.model"));
function redirectURL(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { url } = req.params;
            //find corresponding original url from database
            const hostUrl = "http://localhost:2020";
            let shortenedUrl = yield url_model_1.default.findOne({ shortUrl: `${hostUrl}/${url}` });
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
            yield shortenedUrl.save();
            //perform the redirect
            res.redirect(shortenedUrl.originalURL);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ e: "internal error" });
        }
    });
}
exports.redirectURL = redirectURL;

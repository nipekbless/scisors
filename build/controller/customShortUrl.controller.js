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
exports.customShortUrl = void 0;
const url_model_1 = __importDefault(require("../model/url.model"));
function customShortUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const targetUrl = req.params;
        const customUrl = req.body.customUrl;
        const hostUrl = "http://localhost:2020";
        try {
            // search the database for target short URL data and replace with the custom url
            const updatedShortUrl = yield url_model_1.default.findOneAndUpdate(targetUrl, { shortUrl: `${hostUrl}/${customUrl}` }, { new: true });
            if (!updatedShortUrl) {
                return res.status(404).json({ error: "Short URL not found" });
            }
            return res.json(updatedShortUrl);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ e: "internal error" });
        }
    });
}
exports.customShortUrl = customShortUrl;

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
exports.getUserURLs = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const getUserURLs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user ? req.user : null;
        console.log(user);
        // Find the user and populate the 'urls' field
        const User = yield user_model_1.default.findById(user).populate("urls");
        console.log(User);
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }
        // Extract the URLs from the user object
        const urls = User.urls;
        // Extract specific information from each URL object
        const urlInfo = urls.map((url) => {
            return {
                originalURL: url.originalURL,
                shortUrl: url.shortUrl,
                createdAt: url.createdAt,
                clicks: url.clicks,
                referringSources: url.referringSources,
                lastClickedAt: url.lastClickedAt
            };
        });
        console.log(urls);
        res.json({ urlInfo });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserURLs = getUserURLs;

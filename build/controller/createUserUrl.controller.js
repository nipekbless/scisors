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
exports.createUserUrl = void 0;
const url_model_1 = __importDefault(require("../model/url.model"));
const validateUrl_1 = require("../utils/validateUrl");
const user_model_1 = __importDefault(require("../model/user.model"));
const nanoid_1 = require("nanoid");
// Generate custom ID
const nanoid = (0, nanoid_1.customAlphabet)("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 3);
function createUserUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //get original url from request body
            const { originalURL } = req.body;
            console.log(originalURL);
            const userDetails = req.user ? req.user : null;
            const hostUrl = "http://localhost:2020";
            // check if url is valid
            const isValidUrl = (0, validateUrl_1.validateURL)(originalURL);
            if (isValidUrl) {
                //shorten url and return to client
                const shortid = nanoid();
                const completeUrl = `${hostUrl}/${shortid}`;
                const shortenedUrl = new url_model_1.default({ originalURL, shortUrl: completeUrl, shortId: shortid });
                yield shortenedUrl.save();
                // Associate the URL with the user
                const user = yield user_model_1.default.findById(userDetails);
                if (user) {
                    user.urls.push(shortenedUrl._id);
                    yield user.save();
                }
                return res.send(completeUrl);
            }
            res.send("Invalid URL");
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ e: "internal error" });
        }
    });
}
exports.createUserUrl = createUserUrl;

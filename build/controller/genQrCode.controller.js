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
exports.generateQrCode = void 0;
const uploadQrCode_1 = require("../utils/uploadQrCode");
const url_model_1 = __importDefault(require("../model/url.model"));
function generateQrCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // get shortenend url for qrcode generation
            const desUrl = req.params;
            const url = yield url_model_1.default.findOne(desUrl);
            if (!url) {
                return res.status(404).json({ error: "URL not found" });
            }
            // Extract its original url and use it to generate qrCode
            const { originalURL } = url;
            yield (0, uploadQrCode_1.generateAndSaveQRCode)(originalURL);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ e: "internal error" });
        }
    });
}
exports.generateQrCode = generateQrCode;

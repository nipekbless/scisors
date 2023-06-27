"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var nanoid_1 = require("nanoid");
//generate customeID
var nanoid = (0, nanoid_1.customAlphabet)("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 3);
var urlSchema = new mongoose_1.Schema({
    originalURL: { type: String, required: true },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        default: function () { return nanoid(); },
    },
    createdAt: { type: Date, default: Date.now },
    clicks: { type: Number, required: true, default: 0 },
    lastClickedAt: { type: Date },
    referringSources: [String],
});
var shortUrl = mongoose_1.default.model("ShortURL", urlSchema);
exports.default = shortUrl;

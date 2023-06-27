"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateURL = void 0;
function validateURL(url) {
    const urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return urlPattern.test(url);
}
exports.validateURL = validateURL;

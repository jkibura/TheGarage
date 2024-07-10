"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCspHeaders = void 0;
const helmet_1 = __importDefault(require("helmet"));
const setCspHeaders = () => {
    return helmet_1.default.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "maxcdn.bootstrapcdn.com"],
            scriptSrc: ["'self'", "cdnjs.cloudflare.com"],
        },
    });
};
exports.setCspHeaders = setCspHeaders;

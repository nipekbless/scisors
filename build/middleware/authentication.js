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
const passport_local_1 = require("passport-local");
const user_model_1 = __importDefault(require("../model/user.model"));
const passport_jwt_1 = require("passport-jwt");
function configurePassport(passport) {
    passport.use(new passport_jwt_1.Strategy({
        secretOrKey: process.env.JWT_SECRET || "default-secret",
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()
    }, (token, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            return done(null, token.user);
        }
        catch (error) {
            return done(error);
        }
    })));
    passport.use("signup", new passport_local_1.Strategy({ passReqToCallback: true, usernameField: "email", passwordField: "password" }, (req, email, password, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { first_name, last_name } = req.body;
            const user = yield user_model_1.default.create({ first_name, last_name, email, password });
            return done(null, user);
        }
        catch (error) {
            console.error(error);
            return done(error);
        }
    })));
    passport.use("login", new passport_local_1.Strategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({ email });
            console.log(user);
            if (!user) {
                return done(null, false, { message: "User not found" });
            }
            const validate = yield user.isValidPassword(password);
            if (!validate) {
                return done(null, false, { message: "Wrong password" });
            }
            return done(null, user, { message: "Logged in successfully" });
        }
        catch (error) {
            return done(error);
        }
    })));
}
exports.default = configurePassport;

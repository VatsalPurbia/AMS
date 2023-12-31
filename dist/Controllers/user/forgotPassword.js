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
exports.changePass = void 0;
const user_1 = require("../../Model/user");
const redis_1 = __importDefault(require("../../db/redis"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const changePass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = "" + req.headers.authorization;
    let decode;
    try {
        decode = jsonwebtoken_1.default.verify(token, 'secretKey1');
        const otp = yield redis_1.default.get(`OTP${decode.id}`);
        const { OTP, newPassword } = req.body;
        console.log(otp, OTP, newPassword);
        if (otp == OTP) {
            yield user_1.userSchema.update({ password: newPassword }, { where: { id: decode === null || decode === void 0 ? void 0 : decode.id } });
            res.status(201).json({ message: 'Otp verified and password is changed' });
        }
        else {
            res.status(400).json({ error: 'otp not valid or expired' });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.changePass = changePass;

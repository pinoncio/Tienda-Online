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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASS,
    },
});
const sendMail = (to, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fromAddress = process.env.SMPT_USER;
        console.log(fromAddress);
        const info = yield transporter.sendMail({
            from: `"Creaciones con amor ${fromAddress}`,
            to,
            subject,
            text,
            html,
        });
        console.log('Mensaje enviado: %s', info.messageId);
        return info;
    }
    catch (error) {
        console.error('Error al enviar el mail:', error);
        throw error;
    }
});
exports.sendMail = sendMail;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mailer_1 = require("../controllers/mailer");
const router = (0, express_1.Router)();
router.post('/send', mailer_1.sendEmail);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_1 = require("../controllers/rol");
const router = (0, express_1.Router)();
router.get('/list', rol_1.getRol);
router.post('/', rol_1.newRol);
router.get('/:id_rol', rol_1.getOneRol);
router.delete('/:id_rol', rol_1.deleteRol);
router.put('/:id_rol', rol_1.updateRol);
exports.default = router;

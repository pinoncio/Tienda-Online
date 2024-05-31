"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_1 = require("../controllers/producto");
const router = (0, express_1.Router)();
router.post('/', producto_1.newProducto);
router.get('/list', producto_1.getProductos);
router.get('/:cod_producto', producto_1.getProducto);
exports.default = router;

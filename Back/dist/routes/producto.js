"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const producto_1 = require("../controllers/producto");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: 'public/',
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        const fileName = `${Date.now()}${ext}`;
        cb(null, fileName);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/', upload.single('imagen'), producto_1.newProducto);
router.patch('/:cod_producto/updateImagen', upload.single('imagen'), producto_1.updateImagen);
router.get('/list', producto_1.getProductos);
router.get('/:cod_producto', producto_1.getProducto);
router.delete('/:cod_producto', producto_1.deleteProducto);
router.put('/:cod_producto', upload.single('imagen'), producto_1.updateProducto);
router.patch('/stock', producto_1.updateStock);
exports.default = router;

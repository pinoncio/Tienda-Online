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
exports.updateImagen = exports.updateStock = exports.updateProducto = exports.deleteProducto = exports.getProductos = exports.getProducto = exports.newProducto = void 0;
const producto_1 = require("../models/producto");
const categoria_1 = require("../models/categoria");
const sequelize_1 = __importDefault(require("sequelize"));
const newProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_producto, precio_producto, descripcion_producto, id_categoria } = req.body;
    const imagen = req.file ? req.file.path : null;
    try {
        yield producto_1.Productos.create({
            "nombre_producto": nombre_producto,
            "precio_producto": precio_producto,
            "descripcion_producto": descripcion_producto,
            "id_categoria": id_categoria,
            "imagen": imagen
        });
        return res.status(201).json({
            msg: "Producto creado correctamente"
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error al crear el nuevo producto"
        });
    }
});
exports.newProducto = newProducto;
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cod_producto } = req.params;
        const id_categoria = yield producto_1.Productos.findOne({ attributes: ['id_categoria'], where: { cod_producto: cod_producto } });
        const num_categoria = id_categoria === null || id_categoria === void 0 ? void 0 : id_categoria.dataValues.id_categoria;
        if (!id_categoria) {
            return res.status(400).json({
                msg: "el producto no existe"
            });
        }
        const producto = yield producto_1.Productos.findOne({ attributes: ['cod_producto', 'nombre_producto', 'precio_producto', 'descripcion_producto', [sequelize_1.default.col('categoria.nombre_categoria'), 'nombre_categoria'], 'cantidad_disponible', 'cantidad_total', 'imagen'],
            include: [
                {
                    model: categoria_1.Categorias,
                    attributes: [],
                }
            ],
            where: {
                cod_producto: cod_producto
            }
        });
        res.json(producto);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error al encontrar el producto"
        });
    }
});
exports.getProducto = getProducto;
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaProductos = yield producto_1.Productos.findAll({ attributes: ['cod_producto', 'nombre_producto', 'precio_producto', 'descripcion_producto', [sequelize_1.default.col('categoria.nombre_categoria'), 'nombre_categoria'], 'cantidad_disponible', 'cantidad_total', 'imagen'],
            include: [
                {
                    model: categoria_1.Categorias,
                    attributes: [],
                }
            ]
        });
        res.json(listaProductos);
    }
    catch (error) {
        res.status(400).json({
            msg: "ha ocurrido un error al obtener los productos"
        });
    }
});
exports.getProductos = getProductos;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_producto } = req.params;
    const idProducto = yield producto_1.Productos.findOne({ where: { cod_producto: cod_producto } });
    if (!idProducto) {
        return res.status(404).json({
            msg: "El codigo: " + cod_producto + " de producto no existe"
        });
    }
    try {
        yield producto_1.Productos.destroy({ where: { cod_producto: cod_producto } });
        return res.json({
            msg: 'Producto ' + cod_producto + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al eliminar el producto con codigo: ' + cod_producto,
            error
        });
    }
});
exports.deleteProducto = deleteProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_producto } = req.params;
    const { nombre_producto, precio_producto, descripcion_producto, categoria_producto } = req.body;
    const idProducto = yield producto_1.Productos.findOne({ where: { cod_producto: cod_producto } });
    if (!idProducto) {
        return res.status(404).json({
            msg: "El codigo del producto no existe"
        });
    }
    try {
        yield producto_1.Productos.update({
            nombre_producto: nombre_producto,
            precio_producto: precio_producto,
            descripcion_producto: descripcion_producto,
            categoria_producto: categoria_producto
        }, { where: { cod_producto: cod_producto } });
        return res.json({
            msg: 'Producto ' + cod_producto + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el producto: ' + cod_producto,
            error
        });
    }
});
exports.updateProducto = updateProducto;
const updateStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cantidad, cod_producto } = req.body;
    const idProducto = yield producto_1.Productos.findOne({ where: { cod_producto: cod_producto } });
    if (!idProducto) {
        return res.status(404).json({
            msg: "El producto ingresado no existe"
        });
    }
    try {
        yield producto_1.Productos.update({
            cantidad_total: idProducto.dataValues.cantidad_disponible + cantidad,
            cantidad_disponible: idProducto.dataValues.cantidad_disponible + cantidad
        }, { where: { cod_producto: cod_producto } });
        return res.json({
            msg: 'Stock del producto ' + cod_producto + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el stock del producto: ' + cod_producto,
            error
        });
    }
});
exports.updateStock = updateStock;
const updateImagen = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_producto } = req.params;
    const URL_IMAGEN = req.file ? req.file.path : null;
    const imagenExtension = URL_IMAGEN + '.jpg';
    try {
        const idProducto = yield producto_1.Productos.findOne({ where: { cod_producto } });
        if (!idProducto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        yield producto_1.Productos.update({
            imagen: imagenExtension
        }, { where: { cod_producto: cod_producto } });
        return res.json({ msg: 'Imagen del producto actualizada correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar la imagen del producto',
            error
        });
    }
});
exports.updateImagen = updateImagen;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoLocal = exports.deleteCarritoProductos = exports.updateCarritoProductos = exports.getCarritoProductos = exports.getCarritosProductos = void 0;
const carrito_productos_1 = require("../models/carrito_productos");
const carrito_1 = require("../models/carrito");
const producto_1 = require("../models/producto");
const user_1 = require("../models/user");
const getCarritosProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario } = req.params;
        let carrito = yield carrito_1.Carrito.findOne({ where: { id_usuario: id_usuario } });
        const idUser = yield user_1.User.findOne({ where: { id_usuario: id_usuario } });
        if (!idUser) {
            return res.status(400).json({
                msg: "El usuario no existe"
            });
        }
        if (!carrito) {
            carrito = yield carrito_1.Carrito.create({
                "id_usuario": id_usuario,
                "total": 0
            });
        }
        const carritoProductos = yield carrito_productos_1.Carrito_productos.findAll({
            include: [
                { model: carrito_1.Carrito, attributes: ['id_carro'] },
                { model: producto_1.Productos, attributes: ['nombre_producto'] },
                { model: producto_1.Productos, attributes: ['precio_producto'] }
            ],
            attributes: ['id_carro_productos', 'cantidad', 'subtotal'], where: { id_carro: carrito === null || carrito === void 0 ? void 0 : carrito.dataValues.id_carro }
        });
        res.json(carritoProductos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos del carrito.' });
    }
});
exports.getCarritosProductos = getCarritosProductos;
const getCarritoProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_carro_productos } = req.params;
    try {
        const carritoProductos = yield carrito_productos_1.Carrito_productos.findByPk(id_carro_productos, {
            include: [
                { model: carrito_1.Carrito, attributes: ['id_carro'] },
                { model: producto_1.Productos, attributes: ['nombre_producto'] }
            ]
        });
        if (carritoProductos) {
            res.json(carritoProductos);
        }
        else {
            res.status(404).json({ error: 'Producto no encontrado en el carrito.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos del carrito.' });
    }
});
exports.getCarritoProductos = getCarritoProductos;
const updateCarritoProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_carro_productos } = req.params;
    const { id_carro, cod_producto, cantidad, subtotal } = req.body;
    try {
        const carritoProductos = yield carrito_productos_1.Carrito_productos.findByPk(id_carro_productos);
        if (carritoProductos) {
            yield carritoProductos.update({
                "id_carro": id_carro,
                "cod_producto": cod_producto,
                "cantidad": cantidad,
                "subtotal": subtotal
            });
            res.json(carritoProductos);
        }
        else {
            res.status(404).json({ error: 'Producto del carrito no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto del carrito.' });
    }
});
exports.updateCarritoProductos = updateCarritoProductos;
const deleteCarritoProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_carro_productos } = req.params;
    try {
        const carritoProductos = yield carrito_productos_1.Carrito_productos.findByPk(id_carro_productos);
        if (carritoProductos) {
            yield carritoProductos.destroy();
            res.json({ mensaje: 'Prodcuto eliminado correctamente del carrito.' });
        }
        else {
            res.status(404).json({ error: 'Producto no encontrado en el carrito.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar producto del carrito' });
    }
});
exports.deleteCarritoProductos = deleteCarritoProductos;
const carritoLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, productos } = req.body;
    console.log(productos);
    if (!productos || !Array.isArray(productos)) {
        return res.status(400).json({ error: 'Los productos deben ser un array' });
    }
    try {
        let carrito = yield carrito_1.Carrito.findOne({ where: { id_usuario } });
        if (!carrito) {
            carrito = yield carrito_1.Carrito.create({ id_usuario });
        }
        for (const producto of productos) {
            let carritoProducto = yield carrito_productos_1.Carrito_productos.findOne({
                where: { id_carro: carrito === null || carrito === void 0 ? void 0 : carrito.dataValues.id_carro, cod_producto: producto.cod_producto },
            });
            let idProducto = yield producto_1.Productos.findOne({ where: { cod_producto: producto.cod_producto } });
            if (carritoProducto) {
                let cantidadCarritoActual = carritoProducto === null || carritoProducto === void 0 ? void 0 : carritoProducto.dataValues.cantidad;
                let subtotalCarritoActual = carritoProducto === null || carritoProducto === void 0 ? void 0 : carritoProducto.dataValues.subtotal;
                yield carritoProducto.update({
                    "cod_producto": producto.cod_producto,
                    "cantidad": producto.cantidad + cantidadCarritoActual,
                    "subtotal": subtotalCarritoActual + ((idProducto === null || idProducto === void 0 ? void 0 : idProducto.dataValues.precio_producto) * producto.cantidad)
                });
                yield carritoProducto.save();
            }
            else {
                yield carrito_productos_1.Carrito_productos.create({
                    id_carro: carrito === null || carrito === void 0 ? void 0 : carrito.dataValues.id_carro,
                    cod_producto: producto.cod_producto,
                    cantidad: producto.cantidad,
                    subtotal: producto.cantidad * (idProducto === null || idProducto === void 0 ? void 0 : idProducto.dataValues.precio_producto)
                });
            }
        }
        res.json({
            msg: 'Carrito actualizado exitosamente'
        });
    }
    catch (error) {
        console.error('Error al actualizar el carrito:', error);
        res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
});
exports.carritoLocal = carritoLocal;

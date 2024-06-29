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
exports.updateVenta = exports.deleteVenta = exports.newVenta = exports.getVenta = exports.getVentasUsuario = exports.getVentas = void 0;
const ventas_1 = require("../models/ventas");
const carrito_1 = require("../models/carrito");
const ventas_producto_1 = require("../models/ventas_producto");
const user_1 = require("../models/user");
const carrito_productos_1 = require("../models/carrito_productos");
const producto_1 = require("../models/producto");
const getVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listVentas = yield ventas_1.Ventas.findAll();
        res.json(listVentas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las Ventas.' });
    }
});
exports.getVentas = getVentas;
const getVentasUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    try {
        const listVentas = yield ventas_1.Ventas.findAll({ where: { id_usuario: id_usuario } });
        res.json(listVentas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las Ventas.' });
    }
});
exports.getVentasUsuario = getVentasUsuario;
const getVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_venta } = req.params;
    try {
        const idVenta = yield ventas_1.Ventas.findOne({ where: { id_venta: id_venta } });
        if (!idVenta) {
            return res.status(404).json({
                msg: "La venta: " + id_venta + " no existe"
            });
        }
        res.json(idVenta);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar la venta: ' + id_venta,
            error
        });
    }
});
exports.getVenta = getVenta;
const newVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id_usuario } = req.params;
    const idUser = yield user_1.User.findOne({ where: { id_usuario: id_usuario } });
    if (!idUser) {
        return res.status(400).json({
            msg: "El usuario " + id_usuario + " no existe"
        });
    }
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    try {
        //**creo la venta */
        const venta = yield ventas_1.Ventas.create({
            "id_usuario": id_usuario,
            "estado_de_la_venta": false,
            "fecha_venta": fechaActual,
            "subtotal": 0,
            "impuestos": 0,
            "descuentos": 0,
            "total": 0,
            "metodo_de_pago": " "
        });
        //**obtengo todos los carritos_productos del usuario: id_usuario */
        const CarritoUser = yield carrito_1.Carrito.findOne({ where: { id_usuario: id_usuario } });
        const idCarritoUser = CarritoUser === null || CarritoUser === void 0 ? void 0 : CarritoUser.dataValues.id_carro;
        const listCarritoProductos = yield carrito_productos_1.Carrito_productos.findAll({ where: { id_carro: idCarritoUser } });
        if (listCarritoProductos.length == 0 || !listCarritoProductos) {
            return res.status(400).json({
                msg: "El carrito esta vacio"
            });
        }
        //**recorro la lista con todos los carritos obteniendo sus valores */
        //**para cada carrito recorrido copio los datos y creo un ventas productos */
        for (const CarritoProducto of listCarritoProductos) {
            let SubTotal = CarritoProducto === null || CarritoProducto === void 0 ? void 0 : CarritoProducto.dataValues.subtotal;
            let idProducto = CarritoProducto === null || CarritoProducto === void 0 ? void 0 : CarritoProducto.dataValues.cod_producto;
            let cantidad = CarritoProducto === null || CarritoProducto === void 0 ? void 0 : CarritoProducto.dataValues.cantidad;
            let idVenta = (_a = venta.dataValues) === null || _a === void 0 ? void 0 : _a.id_venta;
            try {
                yield ventas_producto_1.Ventas_Producto.create({
                    "id_venta": idVenta,
                    "cod_producto": idProducto,
                    "cantidad": cantidad,
                    "subtotal": SubTotal
                });
            }
            catch (error) {
                return res.status(400).json({
                    msg: "Ha ocurrido un error al copiar el carrito a la compra",
                    error
                });
            }
        }
        //** borramos los items del carrito despues de copiarlos por si hay un error en la copia, ademas actualizamos el stock de los productos*/
        for (const CarritoProducto of listCarritoProductos) {
            try {
                let cantidad = CarritoProducto === null || CarritoProducto === void 0 ? void 0 : CarritoProducto.dataValues.cantidad;
                let idProducto = CarritoProducto === null || CarritoProducto === void 0 ? void 0 : CarritoProducto.dataValues.cod_producto;
                let productoActual = yield producto_1.Productos.findOne({ where: { cod_producto: idProducto } });
                let cantidadNueva = (productoActual === null || productoActual === void 0 ? void 0 : productoActual.dataValues.cantidad_disponible) - cantidad;
                yield producto_1.Productos.update({
                    "cantidad_disponible": cantidadNueva
                }, { where: { cod_producto: idProducto } });
                CarritoProducto.destroy();
            }
            catch (error) {
                return res.status(400).json({
                    msg: "Ha ocurrido un error al borrar carrito producto",
                    error
                });
            }
        }
        try {
            yield carrito_1.Carrito.update({
                "total": 0
            }, { where: { id_usuario: id_usuario } });
        }
        catch (error) {
            return res.status(400).json({
                msg: "Ha ocurrido un error",
                error
            });
        }
        //**calcular subtotal, impuestos y el total */
        const listVentasProductos = yield ventas_producto_1.Ventas_Producto.findAll({ where: { id_venta: (_b = venta.dataValues) === null || _b === void 0 ? void 0 : _b.id_venta } });
        let aux = 0;
        for (const VentasProductos of listVentasProductos) {
            aux = (VentasProductos === null || VentasProductos === void 0 ? void 0 : VentasProductos.dataValues.subtotal) + aux;
        }
        const impuestos = (aux * 0.19);
        yield venta.update({
            "estado_de_la_venta": true,
            "subtotal": aux,
            "impuestos": impuestos,
            "total": aux + impuestos
        });
        return res.status(201).json({
            msg: "Venta Hecha correctamente"
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error al realizar la compra",
            error
        });
    }
});
exports.newVenta = newVenta;
const deleteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_venta } = req.params;
    const venta = yield ventas_1.Ventas.findByPk(id_venta);
    if (!venta) {
        return res.status(404).json({
            msg: 'La venta no existe',
        });
    }
    try {
        yield venta.destroy();
        res.json({
            msg: 'Venta eliminada correctamente',
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al eliminar la venta',
            error
        });
    }
});
exports.deleteVenta = deleteVenta;
const updateVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_venta } = req.params;
    const { subtotal } = req.body;
    const venta = yield ventas_1.Ventas.findByPk(id_venta);
    if (!venta) {
        return res.status(404).json({
            msg: 'La venta no existe',
        });
    }
    try {
        yield venta.update({
            "subtotal": subtotal
        });
        res.json({
            msg: 'venta actualizada correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la informacion de la venta',
            error
        });
    }
});
exports.updateVenta = updateVenta;

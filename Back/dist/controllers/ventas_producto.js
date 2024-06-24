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
exports.updateVenta_Producto = exports.deleteVenta_Producto = exports.getVenta_Producto = exports.getVentas_Producto = void 0;
const ventas_producto_1 = require("../models/ventas_producto");
const getVentas_Producto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listVentasProductos = yield ventas_producto_1.Ventas_Producto.findAll();
        res.json(listVentasProductos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de Ventas.' });
    }
});
exports.getVentas_Producto = getVentas_Producto;
const getVenta_Producto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_venta_producto } = req.params;
    try {
        const idVentaProducto = yield ventas_producto_1.Ventas_Producto.findOne({ where: { id_ventas_productos: id_venta_producto } });
        if (!idVentaProducto) {
            return res.status(404).json({
                msg: "El detalle de la venta: " + id_venta_producto + " no existe"
            });
        }
        res.json(idVentaProducto);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el detalle de la venta: ' + id_venta_producto,
            error
        });
    }
});
exports.getVenta_Producto = getVenta_Producto;
const deleteVenta_Producto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_venta_producto } = req.params;
    const idVentaProducto = yield ventas_producto_1.Ventas_Producto.findOne({ where: { id_ventas_productos: id_venta_producto } });
    if (!idVentaProducto) {
        return res.status(404).json({
            msg: "El detalle de venta: " + id_venta_producto + " no existe"
        });
    }
    try {
        yield ventas_producto_1.Ventas_Producto.destroy({ where: { id_ventas_productos: id_venta_producto } });
        return res.json({
            msg: 'Detalle de venta ' + id_venta_producto + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el detalle de venta: ' + id_venta_producto,
            error
        });
    }
});
exports.deleteVenta_Producto = deleteVenta_Producto;
const updateVenta_Producto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_venta_producto } = req.params;
    const { id_venta, cod_producto, cantidad } = req.body;
    const idVentaProducto = yield ventas_producto_1.Ventas_Producto.findOne({ where: { id_ventas_productos: id_venta_producto } });
    if (!idVentaProducto) {
        return res.status(404).json({
            msg: "El id del detalle de venta no existe"
        });
    }
    try {
        yield ventas_producto_1.Ventas_Producto.update({
            id_venta: id_venta,
            cod_producto: cod_producto,
            cantidad: cantidad
        }, { where: { id_ventas_productos: id_venta_producto } });
        return res.json({
            msg: 'Detalle de venta ' + id_venta_producto + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el detalle de venta: ' + id_venta_producto,
            error
        });
    }
});
exports.updateVenta_Producto = updateVenta_Producto;

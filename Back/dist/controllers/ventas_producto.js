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
exports.getDesempeno = exports.get3MasVendido = exports.updateVenta_Producto = exports.deleteVenta_Producto = exports.getVenta_Producto = exports.getVentas_ProductoVenta = exports.getVentas_Producto = void 0;
const ventas_producto_1 = require("../models/ventas_producto");
const producto_1 = require("../models/producto");
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
const getVentas_ProductoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_venta } = req.params;
    try {
        const listVentasProductos = yield ventas_producto_1.Ventas_Producto.findAll({ where: { id_venta: id_venta } });
        res.json(listVentasProductos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de Ventas de esa venta.' });
    }
});
exports.getVentas_ProductoVenta = getVentas_ProductoVenta;
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
const get3MasVendido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // productos = {centidad,productos:{nombre_producto},venta:{fecha}}
    const productos = yield ventas_producto_1.Ventas_Producto.findAll({ attributes: ['cantidad'],
        include: [
            {
                model: producto_1.Productos,
                attributes: ['nombre_producto'],
            },
        ]
    });
    if (!productos || productos.length == 0) {
        return res.status(400).json({
            msg: 'No se han encontrado ventas en ese periodo de tiempo',
        });
    }
    const productosPorNombre = new Map();
    for (const detalleVenta of productos) {
        const nombreProducto = detalleVenta === null || detalleVenta === void 0 ? void 0 : detalleVenta.dataValues.producto.nombre_producto;
        const cantidad = detalleVenta === null || detalleVenta === void 0 ? void 0 : detalleVenta.dataValues.cantidad;
        if (productosPorNombre.has(nombreProducto)) {
            productosPorNombre.get(nombreProducto).push(cantidad);
        }
        else {
            productosPorNombre.set(nombreProducto, [cantidad]);
        }
    }
    try {
        const productosOrdenados = Array.from(productosPorNombre.entries())
            .map(([nombreProducto, cantidades]) => ({
            nombreProducto,
            cantidadTotal: cantidades.reduce((acc, curr) => acc + curr, 0),
        }))
            .sort((a, b) => b.cantidadTotal - a.cantidadTotal);
        // 3 productos mas vendidos
        const top3Productos = productosOrdenados.slice(0, 3);
        let resultado = [];
        if (top3Productos[0]) {
            const producto1 = yield producto_1.Productos.findOne({
                where: { nombre_producto: top3Productos[0].nombreProducto },
            });
            resultado.push(producto1);
        }
        if (top3Productos[1]) {
            const producto2 = yield producto_1.Productos.findOne({
                where: { nombre_producto: top3Productos[1].nombreProducto },
            });
            resultado.push(producto2);
        }
        if (top3Productos[2]) {
            const producto3 = yield producto_1.Productos.findOne({
                where: { nombre_producto: top3Productos[2].nombreProducto },
            });
            resultado.push(producto3);
        }
        return res.json(resultado);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener el reporte',
            error
        });
    }
});
exports.get3MasVendido = get3MasVendido;
const getDesempeno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield ventas_producto_1.Ventas_Producto.findAll({ attributes: ['cantidad'],
            include: [
                {
                    model: producto_1.Productos,
                    attributes: ['nombre_producto'],
                },
            ]
        });
        if (!productos || productos.length == 0) {
            res.status(400).json({
                msg: 'No se han encontrado ventas de productos',
            });
        }
        const productosPorNombre = new Map();
        for (const detalleVenta of productos) {
            const nombreProducto = detalleVenta === null || detalleVenta === void 0 ? void 0 : detalleVenta.dataValues.producto.nombre_producto;
            const cantidad = detalleVenta === null || detalleVenta === void 0 ? void 0 : detalleVenta.dataValues.cantidad;
            if (productosPorNombre.has(nombreProducto)) {
                productosPorNombre.get(nombreProducto).push(cantidad);
            }
            else {
                productosPorNombre.set(nombreProducto, [cantidad]);
            }
        }
        const productosOrdenados = Array.from(productosPorNombre.entries())
            .map(([nombreProducto, cantidades]) => ({
            nombreProducto,
            cantidadTotal: cantidades.reduce((acc, curr) => acc + curr, 0),
        }))
            .sort((a, b) => b.cantidadTotal - a.cantidadTotal);
        return res.json(productosOrdenados);
    }
    catch (error) {
    }
});
exports.getDesempeno = getDesempeno;

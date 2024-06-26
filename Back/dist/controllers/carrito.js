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
exports.deleteCarrito = exports.updateCarrito = exports.getCarritos = exports.getCarrito = exports.newCarrito = void 0;
const carrito_1 = require("../models/carrito");
const carrito_productos_1 = require("../models/carrito_productos");
const producto_1 = require("../models/producto");
const newCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, cantidad, cod_producto } = req.body;
    try {
        let carrito = yield carrito_1.Carrito.findOne({ where: { id_usuario: id_usuario } });
        if (!carrito) {
            carrito = yield carrito_1.Carrito.create({
                "id_usuario": id_usuario,
                "total": 0,
            });
        }
        const pkCarrito = carrito.dataValues.id_carro;
        if (cantidad > 0) {
            const idProducto = yield producto_1.Productos.findOne({ attributes: ['precio_producto', 'cantidad_disponible', 'cantidad_total'], where: { cod_producto: cod_producto } });
            if (!idProducto) {
                return res.status(400).json({
                    msg: "El producto ingresado no existe",
                });
            }
            const cantidadDisponible = (idProducto === null || idProducto === void 0 ? void 0 : idProducto.dataValues.cantidad_disponible) - cantidad;
            if (cantidadDisponible < 0) {
                return res.status(400).json({
                    msg: "No hay stock suficiente"
                });
            }
            const precioProducto = idProducto === null || idProducto === void 0 ? void 0 : idProducto.dataValues.precio_producto;
            const subTotal = precioProducto * cantidad;
            const idCarro = yield carrito_1.Carrito.findOne({ attributes: ['total'], where: { id_carro: pkCarrito } });
            const totals = idCarro === null || idCarro === void 0 ? void 0 : idCarro.dataValues.total;
            try {
                let carritoProducto = yield carrito_productos_1.Carrito_productos.findOne({
                    where: { id_carro: carrito === null || carrito === void 0 ? void 0 : carrito.dataValues.id_carro, cod_producto: cod_producto },
                });
                // si ya existe una relacion entre ese carro y ese producto solo actualizamos la cantidad en esa relacion
                if (carritoProducto) {
                    let cantidadCarritoActual = carritoProducto === null || carritoProducto === void 0 ? void 0 : carritoProducto.dataValues.cantidad;
                    let subtotalCarritoActual = carritoProducto === null || carritoProducto === void 0 ? void 0 : carritoProducto.dataValues.subtotal;
                    yield carritoProducto.update({
                        "cod_producto": cod_producto,
                        "cantidad": cantidad + cantidadCarritoActual,
                        "subtotal": subtotalCarritoActual + (subTotal)
                    });
                    yield carritoProducto.save();
                    yield carrito_1.Carrito.update({
                        total: totals + subtotalCarritoActual + (subTotal)
                    }, { where: { id_carro: pkCarrito }
                    });
                }
                else {
                    yield carrito_productos_1.Carrito_productos.create({
                        id_carro: pkCarrito,
                        cod_producto: cod_producto,
                        cantidad: cantidad,
                        subtotal: subTotal,
                    });
                    yield carrito_1.Carrito.update({
                        total: totals + subTotal
                    }, { where: { id_carro: pkCarrito }
                    });
                }
            }
            catch (error) {
                res.status(400).json({
                    msg: "Ha ocurrido un error al hacer el pedido",
                    error
                });
            }
            return res.status(201).json({
                msg: "Producto ingresado correctamente al carrito"
            });
        }
    }
    catch (error) {
        console.error("Error al procesar el carrito", error);
        return res.status(400).json({
            msg: "Ha ocurrido un error al ingresar el producto al carrito",
            error
        });
    }
});
exports.newCarrito = newCarrito;
const getCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    try {
        const carrito = yield carrito_1.Carrito.findOne({ where: { id_usuario: id_usuario } });
        if (!carrito) {
            return res.status(404).json({
                msg: 'El carrito no existe',
            });
        }
        res.json(carrito);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener el carrito',
            error
        });
    }
});
exports.getCarrito = getCarrito;
const getCarritos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listCarritos = yield carrito_1.Carrito.findAll();
        res.json(listCarritos);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los carritos',
            error
        });
    }
});
exports.getCarritos = getCarritos;
const updateCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_carro } = req.params;
    const { id_usuario } = req.body;
    try {
        const carrito = yield carrito_1.Carrito.findByPk(id_carro);
        if (!carrito) {
            return res.status(404).json({
                msg: 'El carrito no existe',
            });
        }
        yield carrito.update({
            "id_usuario": id_usuario
        });
        res.json({
            msg: 'Carrito actualizado correctamente',
            carrito,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la informacion del carro',
            error
        });
    }
});
exports.updateCarrito = updateCarrito;
const deleteCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_carro } = req.params;
    try {
        const carrito = yield carrito_1.Carrito.findByPk(id_carro);
        if (!carrito) {
            return res.status(404).json({
                msg: 'El carrito no existe',
            });
        }
        yield carrito.destroy();
        res.json({
            msg: 'Carrito eliminado correctamente',
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al eliminar el carrito',
            error
        });
    }
});
exports.deleteCarrito = deleteCarrito;

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
exports.getVenta = exports.getVentas = void 0;
const ventas_1 = require("../models/ventas");
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

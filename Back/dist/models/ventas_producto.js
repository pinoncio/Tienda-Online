"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ventas_Producto = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const ventas_1 = require("./ventas");
const producto_1 = require("./producto");
exports.Ventas_Producto = connection_1.default.define('ventas_productos', {
    'id_ventas_productos': { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    'id_venta': { type: sequelize_1.DataTypes.INTEGER },
    'cod_producto': { type: sequelize_1.DataTypes.INTEGER },
    'cantidad': { type: sequelize_1.DataTypes.INTEGER },
    'subtotal': { type: sequelize_1.DataTypes.INTEGER }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.Ventas_Producto.belongsTo(ventas_1.Ventas, { foreignKey: 'id_venta', onDelete: 'SET NULL' });
exports.Ventas_Producto.belongsTo(producto_1.Productos, { foreignKey: 'cod_producto', onDelete: 'SET NULL' });

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrito_productos = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const carrito_1 = require("./carrito");
const producto_1 = require("./producto");
exports.Carrito_productos = connection_1.default.define('carrito_productos', {
    "id_carro_productos": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "cod_producto": { type: sequelize_1.DataTypes.INTEGER },
    "cantidad": { type: sequelize_1.DataTypes.INTEGER },
    "id_carro": { type: sequelize_1.DataTypes.INTEGER },
}, {
    timestamps: false,
    freezeTableName: true
});
exports.Carrito_productos.belongsTo(producto_1.Productos, { foreignKey: "cod_producto" });
exports.Carrito_productos.belongsTo(carrito_1.Carrito, { foreignKey: "id_carro" });

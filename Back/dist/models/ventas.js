"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ventas = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = require("./user");
exports.Ventas = connection_1.default.define('ventas', {
    'id_venta': { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    'id_usuario': { type: sequelize_1.DataTypes.INTEGER },
    'fecha_venta': { type: sequelize_1.DataTypes.DATEONLY },
    'subtotal': { type: sequelize_1.DataTypes.INTEGER },
    'impuestos': { type: sequelize_1.DataTypes.INTEGER },
    'descuentos': { type: sequelize_1.DataTypes.INTEGER },
    'total': { type: sequelize_1.DataTypes.INTEGER },
    'metodo_de_pago': { type: sequelize_1.DataTypes.STRING },
    'estado_de_la_venta': { type: sequelize_1.DataTypes.BOOLEAN }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.Ventas.belongsTo(user_1.User, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });

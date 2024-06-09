"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrito = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = require("./user");
exports.Carrito = connection_1.default.define('carrito', {
    "id_carro": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "id_usuario": { type: sequelize_1.DataTypes.INTEGER },
    "total": { type: sequelize_1.DataTypes.INTEGER }
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.Carrito.belongsTo(user_1.User, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });

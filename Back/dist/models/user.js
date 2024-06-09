"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const rol_1 = require("./rol");
exports.User = connection_1.default.define('usuario', {
    "id_usuario": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "rut_usuario": { type: sequelize_1.DataTypes.STRING },
    "contrasena": { type: sequelize_1.DataTypes.STRING },
    "nombre_usuario": { type: sequelize_1.DataTypes.STRING },
    "apellido1_usuario": { type: sequelize_1.DataTypes.STRING },
    "apellido2_usuario": { type: sequelize_1.DataTypes.STRING },
    "direccion": { type: sequelize_1.DataTypes.STRING },
    "correo": { type: sequelize_1.DataTypes.STRING },
    "id_rol": { type: sequelize_1.DataTypes.INTEGER }
}, {
    timestamps: false,
    freezeTableName: true
});
exports.User.belongsTo(rol_1.Rol, { foreignKey: 'id_rol', onDelete: 'SET NULL' });

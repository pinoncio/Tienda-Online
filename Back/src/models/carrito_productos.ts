import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Carrito } from './carrito';
import { Productos } from './producto';

export const Carrito_productos = sequelize.define('carrito_productos', {
    "id_carro_productos": { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "cod_producto": { type: DataTypes.INTEGER },
    "cantidad": { type: DataTypes.INTEGER },
    "subtotal": {type: DataTypes.INTEGER},
    "id_carro": { type: DataTypes.INTEGER },
}, {
    timestamps: false,
    freezeTableName: true
});

Carrito_productos.belongsTo(Productos, {foreignKey: "cod_producto"});
Carrito_productos.belongsTo(Carrito, {foreignKey: "id_carro", onDelete: "CASCADE"});
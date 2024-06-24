import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Ventas } from "./ventas";
import { Productos } from "./producto";

export const Ventas_Producto = sequelize.define('ventas_productos',{

    'id_ventas_productos' : {type: DataTypes.INTEGER,primaryKey: true, autoIncrement:true},
    'id_venta': {type: DataTypes.INTEGER},
    'cod_producto': {type: DataTypes.INTEGER},
    'cantidad': {type: DataTypes.INTEGER},
    'subtotal': {type: DataTypes.INTEGER}

},
    {
        freezeTableName: true,
        timestamps: false
    }
);

Ventas_Producto.belongsTo(Ventas,{foreignKey: 'id_venta', onDelete: 'CASCADE'});
Ventas_Producto.belongsTo(Productos,{foreignKey: 'cod_producto', onDelete: 'SET NULL'});
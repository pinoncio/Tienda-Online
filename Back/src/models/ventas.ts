import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user";

export const Ventas = sequelize.define('ventas',{

    'id_venta' : {type: DataTypes.INTEGER,primaryKey: true, autoIncrement:true},
    'id_usuario': {type: DataTypes.INTEGER},
    'fecha_venta': {type: DataTypes.DATEONLY},
    'subtotal': {type: DataTypes.INTEGER},
    'impuestos': {type: DataTypes.INTEGER},
    'descuentos': {type: DataTypes.INTEGER},
    'total': {type: DataTypes.INTEGER},
    'metodo_de_pago': {type: DataTypes.STRING},
    'estado_de_la_venta': {type: DataTypes.BOOLEAN}

},
    {
        freezeTableName: true,
        timestamps: false
    }
);

Ventas.belongsTo(User,{foreignKey: 'id_usuario', onDelete: 'SET NULL'});
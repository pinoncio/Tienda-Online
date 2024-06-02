import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { User } from './user';

export const Carrito = sequelize.define(
'carrito',
    {
        "id_carro": { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        "id_usuario": {type: DataTypes.INTEGER},
        "total": {type: DataTypes.INTEGER}

    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Carrito.belongsTo(User, { foreignKey: 'id_usuario'});
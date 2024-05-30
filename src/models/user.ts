import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Rol } from './rol';

export const User = sequelize.define('usuario',{
    "id_usuario": {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    "rut_usuario": {type: DataTypes.STRING},
    "contrasena": {type: DataTypes.STRING},
    "nombre_usuario": {type: DataTypes.STRING},
    "apellido1_usuario": {type: DataTypes.STRING},
    "apellido2_usuario": {type: DataTypes.STRING},
    "direccion": {type: DataTypes.STRING},
    "id_rol": {type: DataTypes.INTEGER}
        

},
{
    timestamps: false,
    freezeTableName: true
});

User.belongsTo(Rol, { foreignKey: 'id_rol' });
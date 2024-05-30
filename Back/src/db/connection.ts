import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('Creaciones con Amor', 'admin', 'admin', {   // esto se edita segun como tengan nombrado su esquema, usuario y contraseña en su base de datos

    host: 'localhost',
    dialect: 'postgres',
});
 
export default sequelize;  

import express, { Application } from 'express';
import cors from 'cors';
import { User } from './user';
import { Rol } from './rol';
import routesUsers from '../routes/user';
import routesRol from '../routes/rol';
 

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';


        this.midlewares();
        this.listen();
        this.dbConnect();
        this.routes();
        // this.firstUser()


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/users', routesUsers);
        this.app.use('/api/rol', routesRol);
    }

    midlewares() {

        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await User.sync()
            await Rol.sync()

        } catch (error) {
            console.error('No se ha podido conectar a la base de datos');
        }
    }

}
export default Server;

import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import webpayRoutes from '../routes/webpayRoutes';
import { User } from './user';
import { Rol } from './rol';
import { Categorias } from './categoria';
import { Productos } from './producto';
import { Carrito_productos } from './carrito_productos';
import { Carrito } from './carrito';
import { Ventas } from './ventas';
import { Ventas_Producto } from './ventas_producto';
import routesUsers from '../routes/user';
import routesRol from '../routes/rol';
import routesCategoria from '../routes/categoria';
import routesProducto from '../routes/producto';
import routesMail from '../routes/mailer';
import routesCarritoProductos from '../routes/carrito_productos';
import routesCarrito from '../routes/carrito';
import routesVenta from '../routes/ventas';
import routesVentaProducto from '../routes/ventas_producto'
 

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
        this.app.use('/api/webpay_plus', webpayRoutes);
        this.app.use('/api/users', routesUsers);
        this.app.use('/api/rol', routesRol);
        this.app.use('/api/categoria',  routesCategoria);
        this.app.use('/api/producto', routesProducto);
        this.app.use('/api/mail',routesMail);
        this.app.use('/api/carro_productos', routesCarritoProductos);
        this.app.use('/api/carro', routesCarrito);
        this.app.use('/api/venta', routesVenta);
        this.app.use('/api/venta_producto',routesVentaProducto);
    }

    midlewares() {
        this.app.use('/public', express.static(path.join(__dirname, '..', '..', 'public')));
        this.app.use(express.json());
        this.app.use(cors());
    
    }

    async dbConnect() {
        try {
            await Rol.sync()
            await User.sync()
            await Categorias.sync()
            await Productos.sync()
            await Carrito.sync()
            await Carrito_productos.sync()
            await Ventas.sync();
            await Ventas_Producto.sync();

        } catch (error) {
            console.error('No se ha podido conectar a la base de datos');
        }
    }

}
export default Server;

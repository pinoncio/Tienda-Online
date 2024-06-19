"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const webpayRoutes_1 = __importDefault(require("../routes/webpayRoutes"));
const user_1 = require("./user");
const rol_1 = require("./rol");
const categoria_1 = require("./categoria");
const producto_1 = require("./producto");
const carrito_productos_1 = require("./carrito_productos");
const carrito_1 = require("./carrito");
const user_2 = __importDefault(require("../routes/user"));
const rol_2 = __importDefault(require("../routes/rol"));
const categoria_2 = __importDefault(require("../routes/categoria"));
const producto_2 = __importDefault(require("../routes/producto"));
const mailer_1 = __importDefault(require("../routes/mailer"));
const carrito_productos_2 = __importDefault(require("../routes/carrito_productos"));
const carrito_2 = __importDefault(require("../routes/carrito"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
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
        });
    }
    routes() {
        this.app.use('/webpay_plus', webpayRoutes_1.default);
        this.app.use('/api/users', user_2.default);
        this.app.use('/api/rol', rol_2.default);
        this.app.use('/api/categoria', categoria_2.default);
        this.app.use('/api/producto', producto_2.default);
        this.app.use('/api/mail', mailer_1.default);
        this.app.use('/api/carro_productos', carrito_productos_2.default);
        this.app.use('/api/carro', carrito_2.default);
    }
    midlewares() {
        this.app.use('/public', express_1.default.static(path_1.default.join(__dirname, '..', '..', 'public')));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield rol_1.Rol.sync();
                yield user_1.User.sync();
                yield categoria_1.Categorias.sync();
                yield producto_1.Productos.sync();
                yield carrito_1.Carrito.sync();
                yield carrito_productos_1.Carrito_productos.sync();
            }
            catch (error) {
                console.error('No se ha podido conectar a la base de datos');
            }
        });
    }
}
exports.default = Server;

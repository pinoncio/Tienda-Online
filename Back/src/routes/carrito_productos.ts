import {Router} from 'express';
import { getCarritoProductos, getCarritosProductos, updateCarritoProductos, deleteCarritoProductos, carritoLocal} from '../controllers/carrito_producto';


const router = Router();

router.get('/list/:id_usuario',getCarritosProductos);
router.get('/:id_carro_productos',getCarritoProductos);
router.delete('/:id_carro_productos',deleteCarritoProductos);
router.put('/:id_carro_productos',updateCarritoProductos);
router.post('/llenar', carritoLocal);

export default router;
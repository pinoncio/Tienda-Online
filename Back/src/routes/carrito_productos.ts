import {Router} from 'express';
import { getCarritoProductos, getCarritosProductos, updateCarritoProductos, deleteCarritoProductos} from '../controllers/carrito_producto';
import auth from './auth';

const router = Router();

router.get('/list',getCarritosProductos);
router.get('/:id_carro_productos',getCarritoProductos);
router.delete('/:id_carro_productos',deleteCarritoProductos);
router.put('/:id_carro_productos',updateCarritoProductos);

export default router;
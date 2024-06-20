import {Router} from 'express';
import { getCarrito, getCarritos, newCarrito, updateCarrito, deleteCarrito} from '../controllers/carrito';


const router = Router();

router.get('/list',getCarritos);
router.post('/',newCarrito);
router.get('/:id_carro',getCarrito);
router.delete('/:id_carro',deleteCarrito);
router.put('/:id_carro',updateCarrito);

export default router;
import {Router} from 'express';
import {getVenta, getVentas,newVenta,deleteVenta,updateVenta} from '../controllers/ventas';

const router = Router();

router.get('/list',getVentas);
router.post('/:id_usuario',newVenta);
router.get('/:id_venta',getVenta);
router.delete('/:id_venta',deleteVenta);
router.put('/:id_venta',updateVenta);

export default router;
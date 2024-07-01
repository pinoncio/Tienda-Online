import {Router} from 'express';
import { getVentas_Producto, getVenta_Producto,updateVenta_Producto,deleteVenta_Producto, getVentas_ProductoVenta, get3MasVendido, getDesempeno}  from '../controllers/ventas_producto';

const router = Router();

router.get('/list',getVentas_Producto);
router.get('/:id_venta_producto',getVentas_Producto);
router.delete('/:id_venta_producto',deleteVenta_Producto);
router.put('/:id_venta_producto',updateVenta_Producto);
router.get('/list/:id_venta',getVentas_ProductoVenta);
router.get('/reporte/masVendido',get3MasVendido);
router.get('/reporte/desempeno',getDesempeno);
export default router;
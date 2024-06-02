import {Router} from 'express';
import { deleteProducto, getProducto,getProductos,newProducto, updateProducto, updateStock } from '../controllers/producto';
import auth from './auth';

const router = Router();

router.post('/',newProducto);
router.get('/list',getProductos);
router.get('/:cod_producto',getProducto);
router.delete('/:cod_producto',deleteProducto);
router.put('/:cod_producto',updateProducto);
router.patch('/stock',updateStock);


export default router;
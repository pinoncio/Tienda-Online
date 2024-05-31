import {Router} from 'express';
import { getProducto,getProductos,newProducto } from '../controllers/producto';
import auth from './auth';

const router = Router();

router.post('/',newProducto);
router.get('/list',getProductos);
router.get('/:cod_producto',getProducto);


export default router;
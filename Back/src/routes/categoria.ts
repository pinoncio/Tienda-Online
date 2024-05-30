import {Router} from 'express';
import {getCategoria,newCategoria,updateCategoria,deleteCategoria,getOneCategoria} from '../controllers/categoria';
import auth from './auth';

const router = Router();

router.get('/list',getCategoria);
router.post('/',newCategoria);
router.get('/:id_categoria',getOneCategoria);
router.delete('/:id_categoria',deleteCategoria);
router.put('/:id_categoria',updateCategoria);

export default router;
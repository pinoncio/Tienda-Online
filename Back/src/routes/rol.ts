import {Router} from 'express';
import {getRol,newRol,updateRol,deleteRol,getOneRol} from '../controllers/rol';


const router = Router();

router.get('/list',getRol);
router.post('/',newRol);
router.get('/:id_rol',getOneRol);
router.delete('/:id_rol',deleteRol);
router.put('/:id_rol',updateRol);

export default router;
import {Router} from 'express';
import {  loginUser, newUser, getUsers,getUser,deleteUser, updateUser } from '../controllers/user';
import auth from './auth';

const router = Router();

router.post('/',newUser);
router.post('/login', loginUser) // login no llevaria validateToken pq es en el login donde se cre y se devuelve para q lo capturen
router.get('/list',getUsers);
router.get('/:rut_usuario',auth,getUser);   // si quieren q se verifique el token de la sesion se debe agregar validateToken. ej: router.get('/:rut_usuario',validateToken,getUser);
router.delete('/:rut_usuario',deleteUser);
router.put('/:rut_usuario',updateUser); // si la ruta tiene :rut_usuario entonces significa q el rut se rescata desde la ruta. ej: un update hacia el usuario rut "00000-0" seria un put a la ruta localhost:3000/api/users/00000-0

export default router;
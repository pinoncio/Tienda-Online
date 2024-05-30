"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.post('/', user_1.newUser);
router.post('/login', user_1.loginUser); // login no llevaria validateToken pq es en el login donde se cre y se devuelve para q lo capturen
router.get('/list', user_1.getUsers);
router.get('/:id_usuario', user_1.getUser); // si quieren q se verifique el token de la sesion se debe agregar validateToken. ej: router.get('/:rut_usuario',validateToken,getUser);
router.delete('/:id_usuario', user_1.deleteUser);
router.put('/:id_usuario', user_1.updateUser); // si la ruta tiene :rut_usuario entonces significa q el rut se rescata desde la ruta. ej: un update hacia el usuario rut "00000-0" seria un put a la ruta localhost:3000/api/users/00000-0
exports.default = router;

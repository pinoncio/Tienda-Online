"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUser = exports.loginUser = exports.getUsers = exports.newUser = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rol_1 = require("../models/rol");
const sequelize_1 = __importDefault(require("sequelize"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut_usuario, contrasena, nombre_usuario, apellido1_usuario, apellido2_usuario, direccion, id_rol } = req.body;
    const usuario = yield user_1.User.findOne({ where: { rut_usuario: rut_usuario } });
    if (usuario) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con ese rut'
        });
    }
    const hashedpassword = yield bcrypt_1.default.hash(contrasena, 10);
    try {
        yield user_1.User.create({
            "rut_usuario": rut_usuario,
            "contrasena": hashedpassword,
            "nombre_usuario": nombre_usuario,
            "apellido1_usuario": apellido1_usuario,
            "apellido2_usuario": apellido2_usuario,
            "direccion": direccion,
            "id_rol": id_rol
        });
        return res.status(201).json({
            msg: 'Usuario creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear el usuario',
            error
        });
    }
});
exports.newUser = newUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listUsers = yield user_1.User.findAll({
            attributes: [
                'rut_usuario',
                'nombre_usuario',
                'apellido1_usuario',
                'apellido2_usuario',
                'direccion',
                'contrasena',
                'id_rol',
                [sequelize_1.default.col('rol.nombre_rol'), 'nombre_rol']
            ],
            include: {
                model: rol_1.Rol,
                attributes: [],
            }
        });
        return res.json(listUsers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
});
exports.getUsers = getUsers;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut_usuario, contrasena } = req.body;
    // validacion de usuario
    const usuario = yield user_1.User.findOne({ where: { rut_usuario: rut_usuario } });
    if (!usuario) {
        return res.status(401).json({
            msg: 'El rut ingresado no es valido'
        });
    }
    //validacion del password
    const passwordValida = yield bcrypt_1.default.compare(contrasena, usuario.contrasena);
    if (!passwordValida) {
        return res.status(401).json({
            msg: 'Contraseña Incorrecta'
        });
    }
    // generar token
    const idRol = usuario.dataValues.id_rol;
    const token = jsonwebtoken_1.default.sign({
        rut_usuario: rut_usuario,
        role: idRol
    }, process.env.SECRET_KEY || 'PRUEBA1'); // , {expiresIn: '10000'} como tercer parametro para timepo de expiracion del token
    res.json({ token, rol: idRol });
});
exports.loginUser = loginUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut_usuario } = req.params;
    const idUser = yield user_1.User.findOne({
        attributes: [
            'rut_usuario',
            'nombre_usuario',
            'apellido1_usuario',
            'apellido2_usuario',
            'direccion',
            'contrasena',
            'id_rol',
            [sequelize_1.default.col('rol.nombre_rol'), 'nombre_rol']
        ],
        include: {
            model: rol_1.Rol,
            attributes: []
        }, where: { rut_usuario: rut_usuario }
    });
    if (!idUser) {
        return res.status(404).json({
            msg: "El rut de usuario indicado no existe"
        });
    }
    try {
        return res.json(idUser);
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut_usuario } = req.params;
    const idUser = yield user_1.User.findOne({ where: { rut_usuario: rut_usuario } });
    if (!idUser) {
        return res.status(404).json({
            msg: "El rut " + rut_usuario + " de usuario no existe"
        });
    }
    try {
        yield user_1.User.destroy({ where: { rut_usuario: rut_usuario } });
        res.json({
            msg: "Se ha eliminado al usuario: " + rut_usuario
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar el usuario con rut: " + rut_usuario,
            error
        });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut_usuario } = req.params;
    const idUser = yield user_1.User.findOne({ where: { rut_usuario: rut_usuario } });
    if (!idUser) {
        return res.status(404).json({
            msg: "El rut " + rut_usuario + " de usuario no existe"
        });
    }
    try {
        const { nombre_usuario, apellido1_usuario, apellido2_usuario, contrasena, direccion, id_rol } = req.body;
        if (contrasena != null) {
            const hashedpassword = yield bcrypt_1.default.hash(contrasena, 10);
            yield user_1.User.update({
                nombre_usuario: nombre_usuario,
                apellido1_usuario: apellido1_usuario,
                apellido2_usuario: apellido2_usuario,
                contrasena: hashedpassword,
                direccion: direccion,
                id_rol: id_rol
            }, { where: { rut_usuario: rut_usuario }
            });
            res.json({
                msg: "Se ha actualizado al usuario: " + rut_usuario
            });
        }
        else {
            yield user_1.User.update({
                nombre_usuario: nombre_usuario,
                apellido1_usuario: apellido1_usuario,
                apellido2_usuario: apellido2_usuario,
                direccion: direccion,
                id_rol: id_rol
            }, { where: { rut_usuario: rut_usuario }
            });
            res.json({
                msg: "Se ha actualizado al usuario: " + rut_usuario
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el usuario con rut: " + rut_usuario,
            error
        });
    }
});
exports.updateUser = updateUser;

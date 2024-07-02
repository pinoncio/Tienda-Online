import {Request, Response} from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Rol } from '../models/rol';
import sequelize from 'sequelize';

export const newUser = async(req: Request, res: Response) =>{

    const { rut_usuario, contrasena, nombre_usuario, apellido1_usuario, apellido2_usuario, direccion, correo, id_rol} =  req.body;

    const usuario = await User.findOne({where: {rut_usuario: rut_usuario}})
    const userCorreo = await User.findOne({where: {correo: correo}});

    if(usuario ) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con ese rut'
        })
    }
    if(userCorreo ) {
        return res.status(400).json({
            msg: 'El correo ingresado ya ha sido utilizado'
        })
    }

    const hashedpassword = await bcrypt.hash(contrasena, 10)

    try{
         await User.create({
            "rut_usuario": rut_usuario,
            "contrasena": hashedpassword,
            "nombre_usuario":nombre_usuario,
            "apellido1_usuario": apellido1_usuario,
            "apellido2_usuario":apellido2_usuario,
            "direccion":direccion,
            "correo":correo,
            "id_rol":id_rol,
            "estado_pago": false
        })
        return res.status(201).json({
            msg: 'Usuario creado correctamente'
            
        })

    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear el usuario',
            error
        })
    }
}



export const getUsers = async(req: Request, res: Response) =>{
    try{   
    const listUsers = await User.findAll({
        attributes: [
            'id_usuario',
            'rut_usuario',
            'nombre_usuario',
            'apellido1_usuario',
            'apellido2_usuario',
            'direccion',
            'contrasena',
            'correo',
            'id_rol',
            [sequelize.col('rol.nombre_rol'), 'nombre_rol'],
            'estado_pago'
        ],
        include: {
            model: Rol,
            attributes: [],
        }
    });

    return res.json(listUsers);
}catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
}

export const loginUser = async(req: Request, res: Response) =>{

    const { correo, contrasena } = req.body;

    // validacion de usuario
    const usuario: any = await User.findOne({where: {correo: correo}})

    if(!usuario) {
        return res.status(401).json({
            msg: 'El correo ingresado no es valido'
        })
    }
    //validacion del password
    const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena)
    if(!passwordValida) {
        return res.status(401).json({
            msg: 'Contraseña Incorrecta'
        })
    }

    // generar token
    const idRol = usuario.dataValues.id_rol
    const idUser = usuario.dataValues.id_usuario
    const token = jwt.sign({
        correo: correo,
        role: idRol
    }, process.env.SECRET_KEY || 'PRUEBA1'); // , {expiresIn: '10000'} como tercer parametro para timepo de expiracion del token

    
    res.json({token, rol: idRol, idUser: idUser});

}

export const getUser = async(req: Request, res: Response) =>{
    const {id_usuario} = req.params;
    const idUser = await User.findOne({
        attributes: [
            'id_usuario',
            'rut_usuario',
            'nombre_usuario',
            'apellido1_usuario',
            'apellido2_usuario',
            'direccion',
            'contrasena',
            'correo',
            'id_rol',
            [sequelize.col('rol.nombre_rol'), 'nombre_rol'],
            'estado_pago'
        ],
        include: {
            model: Rol,
            attributes: []
        },where: {id_usuario: id_usuario}
    });
    if(!idUser) {
        return res.status(404).json({
            msg: "El id de usuario indicado no existe"
        })
    }
    try{
        return res.json(idUser)
    }catch (error){
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })

    }
}

export const deleteUser = async(req: Request, res: Response) =>{
    const {id_usuario} = req.params;
    const idUser = await User.findOne({where: {id_usuario: id_usuario}})

    if(!idUser) {
        return res.status(404).json({
            msg: "El id "+id_usuario+ " de usuario no existe"
        })
    }
    try{
        await User.destroy({where: {id_usuario: id_usuario},cascade: true})
        res.json({
            msg: "Se ha eliminado al usuario: "+id_usuario
        })
    }catch (error){
        res.status(400).json({
            msg: "No se ha podido eliminar el usuario con id: "+id_usuario,
            error
        })
    }
}

export const updateUser = async(req: Request, res: Response)=>{
    const {id_usuario} = req.params;
    const idUser = await User.findOne({where: {id_usuario: id_usuario}})

    if(!idUser) {
        return res.status(404).json({
            msg: "El rut "+id_usuario+ " de usuario no existe"
        })
    }
    try{
        const {nombre_usuario,apellido1_usuario,apellido2_usuario,contrasena,direccion,correo,id_rol,estado_pago} = req.body;

        if(!contrasena && !nombre_usuario && !apellido1_usuario && !apellido2_usuario && !contrasena && !direccion && !correo && !id_rol){
            await User.update({
                estado_pago: estado_pago
    
            },{where: {id_usuario: id_usuario}

        })
        return res.json({
            msg: "Se ha actualizado al usuario: "+id_usuario
        })

    }



        // controlamos error del front cuando le damos editar yno cambiamos la contraseña
        if (contrasena != idUser?.dataValues.contrasena){
            const hashedpassword = await bcrypt.hash(contrasena, 10)
            await User.update({
                nombre_usuario: nombre_usuario,
                apellido1_usuario: apellido1_usuario,
                apellido2_usuario: apellido2_usuario,
                contrasena: hashedpassword,
                direccion:direccion,
                correo:correo,
                id_rol:id_rol
    
            },{where: {id_usuario: id_usuario}
        })
            return res.json({
                msg: "Se ha actualizado al usuario: "+id_usuario
            })
        } else{
            await User.update({
                nombre_usuario: nombre_usuario,
                contrasena: contrasena,
                apellido1_usuario: apellido1_usuario,
                apellido2_usuario: apellido2_usuario,
                direccion: direccion,
                correo: correo,
                id_rol:id_rol
    
            },{where: {id_usuario: id_usuario}
        })
            return res.json({
                msg: "Se ha actualizado al usuario: "+id_usuario
            })

        }
    }catch (error){
        return res.status(400).json({
            msg: "No se ha podido actualizar el usuario con id: "+id_usuario,
            error
        })
    }
}
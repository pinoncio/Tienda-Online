import {Request, Response} from 'express';
import { Categorias } from '../models/categoria';


export const getCategoria = async(req: Request, res: Response) =>{  
    try {
        const listCategoria = await Categorias.findAll({attributes:['id_categoria','nombre_categoria','estado_categoria']});
        res.json(listCategoria)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las categorias.' });
    }
};
export const newCategoria = async(req: Request, res: Response) =>{
    const { nombre_categoria, estado_categoria} =  req.body;
    try{
         await Categorias.create({
            "nombre_categoria": nombre_categoria,
            "estado_categoria": estado_categoria
        })
        return res.status(201).json({
            msg: 'Categoria creada correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear la categoria',
            error
        })
    }
}
export const updateCategoria = async(req: Request, res: Response) => {
    const {id_categoria} = req.params;
    const {nombre_categoria, estado_categoria} = req.body;
    const idCategoria = await Categorias.findOne({where: {id_categoria: id_categoria}})
    if (!idCategoria) {
        return res.status(404).json({
            msg: "El id de la categoria no existe"
        })
    }
    try{
        await Categorias.update({
            nombre_categoria: nombre_categoria,
            estado_categoria: estado_categoria
            },
            {where: {id_categoria: id_categoria}}
        )
        return res.json({
            msg:'Categoria ' + id_categoria + ' actualizada correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar la categoria: '+id_categoria,
                error
            })

        }
}
export const getOneCategoria = async(req: Request, res: Response) =>{
    const { id_categoria} =  req.params;
    console.log(id_categoria)
    const idCategoria = await Categorias.findOne({where: {id_categoria: id_categoria}})
    if (!idCategoria) {
        return res.status(404).json({
            msg: "La categoria: " + id_categoria + " no existe"
        })
    }
    try{

        const categoriaOne = await Categorias.findOne({where: {id_categoria: id_categoria}})
        res.json(categoriaOne)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar la categoria: '+id_categoria,
                error
            })

        }
}
export const deleteCategoria = async(req: Request, res: Response) =>{
    const { id_categoria} =  req.params;
    const idCategoria = await Categorias.findOne({where: {id_categoria: id_categoria}})
    if (!idCategoria) {
        return res.status(404).json({
            msg: "El id: " + id_categoria + " de la categoria no existee"
        })
    }
    try{
        await Categorias.destroy({where: {id_categoria: id_categoria}}
        )
        return res.json({
            msg:'Categoria ' + id_categoria + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar la categoria: '+id_categoria,
                error
            })

        }
}

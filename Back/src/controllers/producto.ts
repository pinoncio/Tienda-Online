import { Request, Response, NextFunction } from "express";
import { Productos } from "../models/producto";
import { Categorias } from "../models/categoria";
import sequelize from "sequelize";


export const newProducto = async(req: Request, res: Response) =>{
    const {nombre_producto, precio_producto, descripcion_producto,id_categoria, cantidad_disponible} = req.body;
    const imagen = req.file ? req.file.path : null;

    try{
        await Productos.create({
            "nombre_producto": nombre_producto,
            "precio_producto": precio_producto,
            "descripcion_producto": descripcion_producto,
            "id_categoria": id_categoria,
            "cantidad_disponible": cantidad_disponible,
            "imagen": imagen
        })
        return res.status(201).json({
            msg: "Producto creado correctamente"
        })
    } catch (error){
        res.status(400).json({
            msg: "Ocurrio un error al crear el nuevo producto"
        })
    }
}

export const getProducto = async(req: Request, res: Response) => {
    try{
        const {cod_producto} = req.params;
        const id_categoria = await Productos.findOne({attributes:['id_categoria'],where:{cod_producto: cod_producto}});
        const num_categoria = id_categoria?.dataValues.id_categoria;
        if(!id_categoria){
            return res.status(400).json({
                msg: "el producto no existe"
            })
        }
        const producto = await Productos.findOne({attributes:['cod_producto','nombre_producto','precio_producto','descripcion_producto',[sequelize.col('categoria.nombre_categoria'), 'nombre_categoria'],'cantidad_disponible', 'cantidad_total','imagen','cod_producto'],
            include: [
              {
                model: Categorias,
                attributes: [],
              }
            ],
            where: {
              cod_producto: cod_producto
            }
          });
        res.json(producto);
    }catch (error){
        res.status(400).json({
            msg: "Ha ocurrido un error al encontrar el producto"
        })
    }
};

export const getProductos = async(req: Request, res: Response) =>{
    try{
        const listaProductos = await Productos.findAll({attributes:['cod_producto','nombre_producto','precio_producto','descripcion_producto',[sequelize.col('categoria.nombre_categoria'), 'nombre_categoria'],'cantidad_disponible', 'cantidad_total','imagen','cod_producto'],
        include: [
          {
            model: Categorias,
            attributes: [],
          }
        ]
      })
      res.json(listaProductos)
    }catch(error){
        res.status(400).json({
            msg: "ha ocurrido un error al obtener los productos"
        })
    }
}

export const deleteProducto = async(req: Request,res: Response) =>{
    const {cod_producto} = req.params;
    const idProducto = await Productos.findOne({where: {cod_producto: cod_producto}})
    if (!idProducto) {
        return res.status(404).json({
            msg: "El codigo: " + cod_producto + " de producto no existe"
        })
    }
    try{
        await Productos.destroy({where: {cod_producto: cod_producto}}
        )
        return res.json({
            msg:'Producto ' + cod_producto + ' borrado correctamente'
        })

    }catch(error){
        return res.status(400).json({
            msg: 'Ha ocurrido un error al eliminar el producto con codigo: '+cod_producto,
            error
        })

    }
}

export const updateProducto = async(req:Request, res: Response) =>{
    const {cod_producto} = req.params;
    const {nombre_producto, precio_producto,descripcion_producto,categoria_producto} = req.body;
    const imagen = req.file ? req.file.path : null;
    const idProducto = await Productos.findOne({where: {cod_producto: cod_producto}})
    if (!idProducto) {
        return res.status(404).json({
            msg: "El codigo del producto no existe"
        })
    }
    try{
        if(imagen != null){
            await Productos.update({
                nombre_producto: nombre_producto,
                precio_producto: precio_producto,
                descripcion_producto: descripcion_producto,
                categoria_producto: categoria_producto,
                imagen: imagen
                },
                {where: {cod_producto: cod_producto}}
            )
            return res.json({
                msg:'Producto ' + cod_producto + ' actualizado correctamente'
            })
        }else{
            await Productos.update({
                nombre_producto: nombre_producto,
                precio_producto: precio_producto,
                descripcion_producto: descripcion_producto,
                categoria_producto: categoria_producto
                },
                {where: {cod_producto: cod_producto}}
            )
            return res.json({
                msg:'Producto ' + cod_producto + ' actualizado correctamente'
            })
        }
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el producto: '+cod_producto,
                error
            })

        }
}
export const updateStock = async(req: Request, res: Response) =>{
    const {cantidad, cod_producto} = req.body;


    const idProducto = await Productos.findOne({where: {cod_producto: cod_producto}});
    if(!idProducto){
        return res.status(404).json({
            msg: "El producto ingresado no existe"
        })
    }
    try{

        await Productos.update({
            cantidad_total: idProducto.dataValues.cantidad_disponible + cantidad,
            cantidad_disponible: idProducto.dataValues.cantidad_disponible + cantidad
        },
        {where: {cod_producto: cod_producto}});

        return res.json({
            msg: 'Stock del producto '+cod_producto+' actualizado correctamente'
        });

    }catch(error){
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el stock del producto: '+cod_producto,
            error
        })

    }


};

export const updateImagen = async (req: Request, res: Response, next: NextFunction) => {
    const { cod_producto } = req.params;
    const URL_IMAGEN = req.file ? req.file.path : null;
    const imagenExtension = URL_IMAGEN+'.jpg'
  
    try {
  
      const idProducto = await Productos.findOne({where: {cod_producto}});
  
      if (!idProducto) {
        return res.status(404).json({ msg: 'Producto no encontrado' });

      }
      
      await Productos.update({
        imagen: imagenExtension
      },{where: {cod_producto: cod_producto}})
  
      return res.json({ msg: 'Imagen del producto actualizada correctamente' });

    } catch (error) {
      console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar la imagen del producto',
            error });
    }
}
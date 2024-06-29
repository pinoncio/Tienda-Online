import { Request, Response } from 'express';
import { Ventas_Producto } from '../models/ventas_producto';

export const getVentas_Producto = async(req: Request, res: Response) =>{  
    try {
        const listVentasProductos = await Ventas_Producto.findAll();
        res.json(listVentasProductos)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de Ventas.' });
    }
};
export const getVentas_ProductoVenta = async(req: Request, res: Response) =>{  
    const { id_venta} =  req.params;
    try {
        const listVentasProductos = await Ventas_Producto.findAll({where:{id_venta: id_venta}});
        res.json(listVentasProductos)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de Ventas de esa venta.' });
    }
};

export const getVenta_Producto = async(req: Request, res: Response) =>{
    const { id_venta_producto} =  req.params;
    try{
        const idVentaProducto = await Ventas_Producto.findOne({where: {id_ventas_productos: id_venta_producto}})
        if (!idVentaProducto) {
            return res.status(404).json({
                msg: "El detalle de la venta: " + id_venta_producto + " no existe"
            })
        }
        res.json(idVentaProducto)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el detalle de la venta: '+id_venta_producto,
                error
            })

        }
}

export const deleteVenta_Producto = async(req: Request, res: Response) =>{
    const { id_venta_producto} =  req.params;
    const idVentaProducto = await Ventas_Producto.findOne({where: {id_ventas_productos: id_venta_producto}})
    if (!idVentaProducto) {
        return res.status(404).json({
            msg: "El detalle de venta: " + id_venta_producto + " no existe"
        })
    }
    try{
        await Ventas_Producto.destroy({where: {id_ventas_productos: id_venta_producto}}
        )
        return res.json({
            msg:'Detalle de venta ' + id_venta_producto + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el detalle de venta: '+id_venta_producto,
                error
            })

        }
}

export const updateVenta_Producto = async(req: Request, res: Response) => {
    const {id_venta_producto} = req.params;
    const {id_venta, cod_producto,cantidad} = req.body;
    const idVentaProducto = await Ventas_Producto.findOne({where: {id_ventas_productos: id_venta_producto}})
    if (!idVentaProducto) {
        return res.status(404).json({
            msg: "El id del detalle de venta no existe"
        })
    }
    try{
        await Ventas_Producto.update({
            id_venta: id_venta,
            cod_producto: cod_producto,
            cantidad: cantidad
            },
            {where: {id_ventas_productos: id_venta_producto}}
        )
        return res.json({
            msg:'Detalle de venta ' + id_venta_producto + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el detalle de venta: '+id_venta_producto,
                error
            })

        }
}
import { Request, Response } from 'express';
import { Ventas_Producto } from '../models/ventas_producto';
import { Ventas } from '../models/ventas';
import sequelize from "sequelize";
import { Op } from "sequelize";
import { Productos } from '../models/producto';

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


export const getMasVendido = async (req: Request, res: Response) => {

    const {fecha_inicio, fecha_final} = req.body;

    // productos = {centidad,productos:{nombre_producto},venta:{fecha}}

    const productos = await Ventas_Producto.findAll({attributes:['cantidad'],
        include: [
          {
            model: Productos,
            attributes: ['nombre_producto'],
          },
          {
            model: Ventas,
            where:{fecha_venta:{[Op.between]: [fecha_inicio,fecha_final]}}
          }
        ]
      })
    if(!productos || productos.length == 0){
        res.status(400).json({
            msg:'No se han encontrado ventas en ese periodo de tiempo',
        })
    }
    const productosPorNombre: Map<string, number[]> = new Map();

    for (const detalleVenta of productos) { 
        const nombreProducto = detalleVenta?.dataValues.producto.nombre_producto; 
        const cantidad = detalleVenta?.dataValues.cantidad; 
      
        if (productosPorNombre.has(nombreProducto)) {
          productosPorNombre.get(nombreProducto)!.push(cantidad);
        } else {
          productosPorNombre.set(nombreProducto, [cantidad]);
        }
      }
    try {
        const productosOrdenados = Array.from(productosPorNombre.entries())
        .map(([nombreProducto, cantidades]) => ({
          nombreProducto,
          cantidadTotal: cantidades.reduce((acc, curr) => acc + curr, 0),
        }))
        .sort((a, b) => b.cantidadTotal - a.cantidadTotal);
  
      // 3 productos mas vendidos
      const top3Productos = productosOrdenados.slice(0, 3);
      let resultado = [];

  
      if (top3Productos[0]){
        const producto1 = await Productos.findOne({
            where: { nombre_producto: top3Productos[0].nombreProducto },
          });
          resultado.push(producto1)
      }
      if (top3Productos[1]){
        const producto2 = await Productos.findOne({
            where: { nombre_producto: top3Productos[1].nombreProducto },
          });
          resultado.push(producto2)
      }

      if (top3Productos[2]){
        const producto3 = await Productos.findOne({
            where: { nombre_producto: top3Productos[2].nombreProducto },
          });
          resultado.push(producto3)
      }
      res.json(resultado);
    }catch(error){
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener el reporte',
            error
        })

    }

}

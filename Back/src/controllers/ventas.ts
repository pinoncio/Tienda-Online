import { Request, Response } from 'express';
import { Ventas } from '../models/ventas';
import { Carrito } from '../models/carrito';
import { Ventas_Producto } from '../models/ventas_producto';
import { User } from '../models/user';
import { Carrito_productos } from '../models/carrito_productos';
import { Productos } from '../models/producto';

export const getVentas = async(req: Request, res: Response) =>{  
    try {
        const listVentas = await Ventas.findAll();
        res.json(listVentas)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las Ventas.' });
    }
};
export const getVentasUsuario = async(req: Request, res: Response) =>{
    const { id_usuario} =  req.params;
    try {
        const listVentas = await Ventas.findAll({where:{id_usuario: id_usuario}});
        res.json(listVentas)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las Ventas de este usuario.' });
    }
};

export const getVenta = async(req: Request, res: Response) =>{
    const { id_venta} =  req.params;
    try{
        const idVenta = await Ventas.findOne({where: {id_venta: id_venta}})
        if (!idVenta) {
            return res.status(404).json({
                msg: "La venta: " + id_venta + " no existe"
            })
        }
        res.json(idVenta)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar la venta: '+id_venta,
                error
            })

        }
}

export const newVenta = async(req: Request, res: Response) =>{
    const {id_usuario} = req.params;

    const idUser = await User.findOne({where: {id_usuario: id_usuario}});
    if (!idUser){
        return res.status(400).json({
            msg: "El usuario "+id_usuario+ " no existe"
        })
    }
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; 
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    try{

        //**creo la venta */
        const venta = await Ventas.create({
            "id_usuario": id_usuario,
            "estado_de_la_venta": false,
            "fecha_venta": fechaActual ,
            "subtotal": 0,
            "impuestos": 0,
            "descuentos": 0,
            "total": 0,
            "metodo_de_pago": " "
        });


        //**obtengo todos los carritos_productos del usuario: id_usuario */

        const CarritoUser = await Carrito.findOne({where:{id_usuario: id_usuario}});
        const idCarritoUser = CarritoUser?.dataValues.id_carro;


        const listCarritoProductos = await Carrito_productos.findAll({where:{id_carro: idCarritoUser}});
        if(listCarritoProductos.length == 0 || !listCarritoProductos){
            return res.status(400).json({
                msg: "El carrito esta vacio"
            })
        }

        //**recorro la lista con todos los carritos obteniendo sus valores */
        //**para cada carrito recorrido copio los datos y creo un ventas productos */

        for (const CarritoProducto of  listCarritoProductos){
            let SubTotal = CarritoProducto?.dataValues.subtotal;
            let idProducto = CarritoProducto?.dataValues.cod_producto;
            let cantidad = CarritoProducto?.dataValues.cantidad;
            let idVenta = venta.dataValues?.id_venta
            try{
                await Ventas_Producto.create({
                    "id_venta": idVenta,
                    "cod_producto": idProducto,
                    "cantidad": cantidad,
                    "subtotal": SubTotal

                });
            }catch(error){
                return res.status(400).json({
                    msg: "Ha ocurrido un error al copiar el carrito a la compra",
                    error
                })

            }

        }
        //** borramos los items del carrito despues de copiarlos por si hay un error en la copia, ademas actualizamos el stock de los productos*/
        for (const CarritoProducto of  listCarritoProductos){
            try{
                let cantidad = CarritoProducto?.dataValues.cantidad;
                let idProducto = CarritoProducto?.dataValues.cod_producto;
                let productoActual = await Productos.findOne({where:{cod_producto: idProducto}});
                let cantidadNueva = productoActual?.dataValues.cantidad_disponible - cantidad
                await Productos.update({
                    "cantidad_disponible": cantidadNueva
                },{where: {cod_producto: idProducto}})
                CarritoProducto.destroy()

            }catch(error){
                return res.status(400).json({
                    msg: "Ha ocurrido un error al borrar carrito producto",
                    error
                })

            }

        }
        try{
            await Carrito.update({
                "total": 0
            },{where: {id_usuario: id_usuario}})

        }catch(error){
            return res.status(400).json({
                msg: "Ha ocurrido un error",
                error
            })
        }

        //**calcular subtotal, impuestos y el total */

        const listVentasProductos = await Ventas_Producto.findAll({where:{id_venta: venta.dataValues?.id_venta}});
        let aux = 0;
        for (const VentasProductos of listVentasProductos){
            aux = VentasProductos?.dataValues.subtotal + aux;
        }
        const impuestos = (aux*0.19);
        await venta.update({
            "estado_de_la_venta": true,
            "subtotal": aux,
            "impuestos": impuestos,
            "total": aux + impuestos
        })

        return res.status(201).json({
            msg: "Venta Hecha correctamente"

        })
    }catch (error){
        return res.status(400).json({
            msg: "Ha ocurrido un error al realizar la compra",
            error
        })
    }
}

export const deleteVenta = async (req: Request, res: Response) => {
    const { id_venta } = req.params;
    const venta = await Ventas.findByPk(id_venta);

    if (!venta) {
        return res.status(404).json({
            msg: 'La venta no existe',
        });
    }

    try {

        await venta.destroy();

        res.json({
            msg: 'Venta eliminada correctamente',
        });
    } catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al eliminar la venta',
            error
        });
        
    }
};

export const updateVenta = async (req: Request, res: Response) => {
    const { id_venta } = req.params;
    const {subtotal} = req.body;

    const venta = await Ventas.findByPk(id_venta);

    if (!venta) {
        return res.status(404).json({
            msg: 'La venta no existe',
        });
    }


    try {

        await venta.update({
            "subtotal": subtotal
        });

        res.json({
            msg: 'venta actualizada correctamente'
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la informacion de la venta',
            error
        });
        
    }
};
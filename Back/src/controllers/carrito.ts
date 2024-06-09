import { Request, Response } from "express";
import { Carrito } from "../models/carrito";
import { Carrito_productos } from "../models/carrito_productos";
import { Productos } from "../models/producto";
import { User } from "../models/user";
import sequelize from "../db/connection";

export const newCarrito = async (req: Request, res: Response) => {
    const { id_usuario, cantidad, cod_producto } = req.body;

    try {


        let carrito = await Carrito.findOne({ where: { id_usuario:id_usuario}});

        if (!carrito){
            carrito = await Carrito.create({
                "id_usuario" : id_usuario,
                "total":  0,
            });
        }


        const pkCarrito = carrito.dataValues.id_carro




            if (cantidad > 0 ){
                const idProducto = await Productos.findOne({ attributes: ['precio_producto','cantidad_disponible','cantidad_total'], where: { cod_producto: cod_producto}});
                if (!idProducto) {
                    return res.status(400).json({
                        msg: "El producto ingresado no existe",
                    })
                }

                const cantidadDisponible = idProducto?.dataValues.cantidad_disponible - cantidad
                if (cantidadDisponible < 0) {
                    return res.status(400).json({
                        msg: "No hay stock suficiente"
                    })
                } 
                
                const precioProducto = idProducto?.dataValues.precio_producto;
                console.log(precioProducto)
                const subTotal = precioProducto * cantidad
                const idCarro = await Carrito.findOne({attributes: ['total'], where: {id_carro: pkCarrito}})
                const totals = idCarro?.dataValues.total

                try {
                    await Carrito_productos.create({
                        id_carro: pkCarrito,
                        cod_producto: cod_producto,
                        cantidad: cantidad,
                        subtotal: subTotal,
                    });

                    await Carrito.update({
                        total: totals + subTotal
                        },
                        {where: {id_carro: pkCarrito}
                    });

                    await Productos.update({
                        cantidad_disponible: cantidadDisponible
                    },
                        { where: { cod_producto: cod_producto}
                    })
                } catch (error){
                    res.status(400).json({
                        msg: "Ha ocurrido un error al hacer el pedido",
                        error
                    })
                }
                return res.status(201).json({
                    msg: "Producto ingresado correctamente al carrito"
            })
            }

    } catch (error) {
        console.error("Error al procesar el carrito", error)
        return res.status(400).json({
            msg: "Ha ocurrido un error al ingresar el producto al carrito",
            error
        })
    }
};

export const getCarrito = async (req: Request, res: Response) => {
    const { id_usuario } = req.params;

    try {
        const carrito = await Carrito.findOne({ where: {id_usuario: id_usuario}});

        if (!carrito) {
            return res.status(404).json({
                msg: 'El carrito no existe',
            });
        }

        res.json(carrito);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener el carrito',
            error
        });
    }
};

export const getCarritos = async (req: Request, res: Response) => {
    try {
        const listCarritos = await Carrito.findAll();
        res.json(listCarritos);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los carritos',
            error
        });
    }
};

export const updateCarrito = async (req: Request, res: Response) => {
    const { id_carro } = req.params;
    const { id_usuario } = req.body;

    try {
        const carrito = await Carrito.findByPk(id_carro);

        if (!carrito) {
            return res.status(404).json({
                msg: 'El carrito no existe',
            });
        }

        await carrito.update({
            "id_usuario": id_usuario
        });

        res.json({
            msg: 'Carrito actualizado correctamente',
            carrito,
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la informacion del carro',
            error
        });
        
    }
};

export const deleteCarrito = async (req: Request, res: Response) => {
    const { id_carro } = req.params;

    try {
        const carrito = await Carrito.findByPk(id_carro);

        if (!carrito) {
            return res.status(404).json({
                msg: 'El carrito no existe',
            });
        }

        await carrito.destroy();

        res.json({
            msg: 'Carrito eliminado correctamente',
        });
    } catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al eliminar el carrito',
            error
        });
        
    }
};
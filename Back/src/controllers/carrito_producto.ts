import { Request, Response } from "express";
import { Carrito_productos } from "../models/carrito_productos";
import { Carrito } from "../models/carrito";
import { Productos } from "../models/producto";
import { User } from "../models/user";

export const getCarritosProductos = async (req: Request, res: Response) => {
    try {
        const {id_usuario} = req.params;
        let carrito = await Carrito.findOne({where: {id_usuario: id_usuario}});
        const idUser = await User.findOne({where:{id_usuario: id_usuario}});
        if (!idUser){
            return res.status(400).json({
                msg: "El usuario no existe"
            })
        }
        if (!carrito){
            carrito = await Carrito.create({
                "id_usuario": id_usuario,
                "total": 0
            })

        }
        const carritoProductos = await Carrito_productos.findAll({
            include: [
                { model: Carrito, attributes: ['id_carro'] },
                { model: Productos, attributes: ['nombre_producto'] }
            ],
            attributes: ['id_carro_productos', 'cantidad', 'subtotal'],where:{id_carro: carrito?.dataValues.id_carro}
        });
        res.json(carritoProductos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos del carrito.' });
    }
};

export const getCarritoProductos = async (req: Request, res: Response) => {
    const { id_carro_productos } = req.params;
    try {
        const carritoProductos = await Carrito_productos.findByPk(id_carro_productos, {
            include: [
                { model: Carrito, attributes: ['id_carro'] },
                { model: Productos, attributes: ['nombre_producto'] }
            ]
        });
        if (carritoProductos) {
            res.json(carritoProductos);
        } else {
            res.status(404).json({ error: 'Producto no encontrado en el carrito.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos del carrito.' });
    }
};

export const updateCarritoProductos = async (req: Request, res: Response) => {
    const { id_carro_productos } = req.params;
    const { id_carro, cod_producto, cantidad, subtotal } = req.body;
    try {
        const carritoProductos = await Carrito_productos.findByPk(id_carro_productos);
        if (carritoProductos) {
            await carritoProductos.update({
                "id_carro": id_carro,
                "cod_producto": cod_producto,
                "cantidad": cantidad,
                "subtotal": subtotal
            });
            res.json(carritoProductos);
        } else {
            res.status(404).json({ error: 'Producto del carrito no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto del carrito.' });
    }
};

export const deleteCarritoProductos = async (req: Request, res: Response) => {
    const { id_carro_productos } = req.params;
    try {
        const carritoProductos = await Carrito_productos.findByPk(id_carro_productos);
        if (carritoProductos) {
            await carritoProductos.destroy();
            res.json({ mensaje: 'Prodcuto eliminado correctamente del carrito.' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado en el carrito.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar producto del carrito' });
    }
}
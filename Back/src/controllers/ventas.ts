import { Request, Response } from 'express';
import { Ventas } from '../models/ventas';

export const getVentas = async(req: Request, res: Response) =>{  
    try {
        const listVentas = await Ventas.findAll();
        res.json(listVentas)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las Ventas.' });
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


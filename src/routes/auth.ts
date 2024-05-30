import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
const auth = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']

    if(headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7)
            jwt.verify(bearerToken,process.env.SECRET_KEY || 'PRUEBA1')
            next()

        } catch (error){
            res.status(401).json({
                msg: 'Token no valido'
            })

        }

    } else {
        res.status(401).json({
            msg: 'Acceso Denegado'
        })
    }
}

export default auth;
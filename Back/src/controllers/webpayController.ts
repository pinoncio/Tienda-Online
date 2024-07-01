import { Request, Response } from 'express';
import { WebpayPlus, Options, Environment, IntegrationCommerceCodes, IntegrationApiKeys} from 'transbank-sdk';



const options = new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration);

export const createTransaction = async (req: Request, res: Response) => {
  const { amount, sessionId, buyOrder, returnUrl} = req.body;

  // returnUrl es la direccion a la que quieres ser dirigido despues de completar el pago

  if (!amount || !sessionId || !buyOrder || !returnUrl) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }


  try {
    const transaction = new WebpayPlus.Transaction(options)
    const createResponse = await transaction.create(buyOrder, sessionId, amount, returnUrl);
    console.log(createResponse.url+"?token_ws="+createResponse.token) //url para pago webpay
    res.json({
        url: createResponse.url ,
        token_ws: createResponse.token
    });
    
    

  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};

export const commitTransaction = async (req: Request, res: Response) => {
  const token_ws = req.query.token_ws;
  if (!token_ws) {
    return res.status(400).json({ error: 'Falta el token' });
  }
  try {
    const transaction = new WebpayPlus.Transaction(options)
    const commitResponse = await transaction.commit(token_ws.toString());

    if (commitResponse.vci === 'TSY' && commitResponse.status === 'AUTHORIZED') {

        // aqui falta hacer algo en la base de datos si se aprueba el pago
        res.redirect(`http://localhost:3001/#/exito`);
        // console.log(commitResponse)
        // return res.json({
        //   msg: "pago exitoso",
        //   detail: commitResponse
        // })

      } else {
        // Transacción rechazada o con errores
        // const errorMessage = getWebpayErrorMessage(commitResponse);  //capturamos el error segun el if de la funcion de abajo
        // res.status(400).json({ error: errorMessage });
        res.redirect(`http://localhost:3001/#/fracaso`);
      }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};

function getWebpayErrorMessage(commitResponse: any): string {
    if (commitResponse.vci === 'TSN') {  //verf documentacion transbank-sdk
      return 'Transacción rechazada';   
    } else if (commitResponse.status === 'REJECTED') {
      return 'Pago rechazado por el banco';
    } else {
      return 'Error en el pago';
    }
  }
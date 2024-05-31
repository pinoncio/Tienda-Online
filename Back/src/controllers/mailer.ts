import { Request, Response } from 'express';
import { sendMail } from '../services/mailer';

export const sendEmail = async (req: Request, res: Response) => {
  const { to, subject, text, html } = req.body;

  try {
    const info = await sendMail(to, subject, text, html);
    res.status(200).json({ message: 'Mail enviado correctamente', info });
  } catch (error) {
    res.status(500).json({ message: 'Error al mandar el mail', error });
  }
};
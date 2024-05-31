import { Request, Response } from 'express';
import { sendMail } from '../services/mailer';

export const sendEmail = async (req: Request, res: Response) => {
  const { to, subject, text, html } = req.body;

  try {
    const info = await sendMail(to, subject, text, html);
    res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error });
  }
};
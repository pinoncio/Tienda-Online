import nodemailer from 'nodemailer';
import dotenv from 'dotenv';




dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'nicolas.pa.vez@hotmail.com',
    pass: 'lqlwbgejjlmadris',
  },
});

export const sendMail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Nicolas" <nicolas.pa.vez@hotmail.com>`,
      to,
      subject,
      text,
      html,
    });

    console.log('Mensaje enviado: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error al enviar el mail:', error);
    throw error;
  }
};
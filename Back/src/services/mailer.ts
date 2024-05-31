import nodemailer from 'nodemailer';
import dotenv from 'dotenv';




dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMPT_PASS,
  },
});

export const sendMail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const fromAddress = process.env.SMPT_USER;
    console.log(fromAddress)
    const info = await transporter.sendMail({
      from: `"Creaciones con amor ${fromAddress}`,
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
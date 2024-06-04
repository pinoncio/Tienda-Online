import axios from 'axios';

const sendMail = async (mailData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/mail/send', mailData);
    return response.data;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
};

export default sendMail;

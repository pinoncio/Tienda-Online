import axios from 'axios';

// Configura la URL base si tu backend está en un dominio o puerto diferente
axios.defaults.baseURL = 'http://localhost:3000';

// Servicio de pago
export const createTransaction = async (amount, sessionId, buyOrder, returnUrl) => {
    try {
      const response = await axios.post('/api/webpay_plus/create', {
        amount,
        sessionId,
        buyOrder,
        returnUrl
      });
  
      if (response.status !== 200) {
        throw new Error('Error al crear la transacción: ' + response.statusText);
      }
  
      return response.data;
    } catch (error) {
      throw new Error('Error al crear la transacción: ' + error.message);
    }
  };
  
// Función para confirmar una transacción
export const commitTransaction = async (token_ws) => {
    try {
      const response = await axios.get('/api/webpay_plus/commit', { token_ws });
      return response.data;
    } catch (error) {
      throw new Error('Error al confirmar la transacción: ' + error.message);
    }
  };
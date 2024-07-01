import axios from 'axios';

const API_URL = 'http://localhost:3000/api/venta';

export const newVenta = async (idUser) => {
  try {
    if (!idUser) {
      throw new Error('idUser is required');
    }
    const response = await axios.post(`${API_URL}/${idUser}`);
    return response.data;
  } catch (error) {
    console.error(`Error creating new venta for idUser ${idUser}:`, error);
    throw error;
  }
};

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';
export const getUser = async (id_usuario) => {
    try {
      const response = await axios.get(`${API_URL}/${id_usuario}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener ventas del usuario:', error);
      throw error;
    }
  };
  
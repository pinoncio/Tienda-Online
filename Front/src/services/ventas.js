import axios from 'axios';

const API_URL = 'http://localhost:3000/api/venta';

export const getVentas = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener ventas del usuario:', error);
    throw error;
  }
};

export const getVentaById = async (idVenta) => {
    try {
      const response = await axios.get(`${API_URL}/${idVenta}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener ventas del usuario:', error);
      throw error;
    }
  };

export const createVenta = (venta) => axios.post(API_URL, venta);

export const updateVenta = (id_venta, venta) => axios.put(`${API_URL}/${id_venta}`, venta);

export const deleteVenta = (id_venta) => axios.delete(`${API_URL}/${id_venta}`);

export const getVentasByUserId = async (idUser) => {
    try {
      const response = await axios.get(`${API_URL}/list/${idUser}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener ventas del usuario:', error);
      throw error;
    }
  };
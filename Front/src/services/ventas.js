import axios from 'axios';

const API_URL = 'http://localhost:3000/api/venta';

export const getVentas = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ventas:', error);
    throw error;
  }
};

export const getVentaById = async (idVenta) => {
  try {
    if (!idVenta) {
      throw new Error('idVenta is required');
    }
    const response = await axios.get(`${API_URL}/${idVenta}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching venta with id ${idVenta}:`, error);
    throw error;
  }
};

export const createVenta = async (venta) => {
  try {
    if (!venta || typeof venta !== 'object') {
      throw new Error('venta must be a valid object');
    }
    const response = await axios.post(API_URL, venta);
    return response.data;
  } catch (error) {
    console.error('Error creating venta:', error);
    throw error;
  }
};

export const updateVenta = async (id_venta, venta) => {
  try {
    if (!id_venta) {
      throw new Error('id_venta is required');
    }
    if (!venta || typeof venta !== 'object') {
      throw new Error('venta must be a valid object');
    }
    const response = await axios.put(`${API_URL}/${id_venta}`, venta);
    return response.data;
  } catch (error) {
    console.error(`Error updating venta with id ${id_venta}:`, error);
    throw error;
  }
};

export const deleteVenta = async (id_venta) => {
  try {
    if (!id_venta) {
      throw new Error('id_venta is required');
    }
    const response = await axios.delete(`${API_URL}/${id_venta}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting venta with id ${id_venta}:`, error);
    throw error;
  }
};

export const getVentasByUserId = async (idUser) => {
  try {
    if (!idUser) {
      throw new Error('idUser is required');
    }
    const response = await axios.get(`${API_URL}/list/${idUser}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ventas for user with id ${idUser}:`, error);
    throw error;
  }
};

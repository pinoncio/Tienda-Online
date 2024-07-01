import axios from 'axios';

const API_URL = 'http://localhost:3000/api/producto';

export const getProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching productos:', error);
    throw error;
  }
};

export const createProducto = async (producto) => {
  try {
    if (!producto || typeof producto !== 'object') {
      throw new Error('producto must be a valid object');
    }
    const response = await axios.post(API_URL, producto);
    return response.data;
  } catch (error) {
    console.error('Error creating producto:', error);
    throw error;
  }
};

export const updateProducto = async (cod_producto, producto) => {
  try {
    if (!cod_producto) {
      throw new Error('cod_producto is required');
    }
    if (!producto || typeof producto !== 'object') {
      throw new Error('producto must be a valid object');
    }
    const response = await axios.put(`${API_URL}/${cod_producto}`, producto);
    return response.data;
  } catch (error) {
    console.error(`Error updating producto with cod_producto ${cod_producto}:`, error);
    throw error;
  }
};

export const deleteProducto = async (cod_producto) => {
  try {
    if (!cod_producto) {
      throw new Error('cod_producto is required');
    }
    const response = await axios.delete(`${API_URL}/${cod_producto}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting producto with cod_producto ${cod_producto}:`, error);
    throw error;
  }
};

export const getProducto = async (cod_producto) => {
  try {
    if (!cod_producto) {
      throw new Error('cod_producto is required');
    }
    const response = await axios.get(`${API_URL}/${cod_producto}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching producto with cod_producto ${cod_producto}:`, error);
    throw error;
  }
};

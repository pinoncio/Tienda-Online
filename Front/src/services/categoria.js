import axios from 'axios';

const API_URL = 'http://localhost:3000/api/categoria';

export const getCategorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categorias:', error);
    throw error;
  }
};

export const createCategoria = async (categoria) => {
  try {
    if (!categoria || typeof categoria !== 'object') {
      throw new Error('categoria must be a valid object');
    }
    const response = await axios.post(API_URL, categoria);
    return response.data;
  } catch (error) {
    console.error('Error creating categoria:', error);
    throw error;
  }
};

export const updateCategoria = async (id_categoria, categoria) => {
  try {
    if (!id_categoria) {
      throw new Error('id_categoria is required');
    }
    if (!categoria || typeof categoria !== 'object') {
      throw new Error('categoria must be a valid object');
    }
    const response = await axios.put(`${API_URL}/${id_categoria}`, categoria);
    return response.data;
  } catch (error) {
    console.error(`Error updating categoria with id ${id_categoria}:`, error);
    throw error;
  }
};

export const deleteCategoria = async (id_categoria) => {
  try {
    if (!id_categoria) {
      throw new Error('id_categoria is required');
    }
    const response = await axios.delete(`${API_URL}/${id_categoria}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting categoria with id ${id_categoria}:`, error);
    throw error;
  }
};

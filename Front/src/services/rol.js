import axios from 'axios';

const API_URL = 'http://localhost:3000/api/rol';

export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

export const createRol = async (rol) => {
  try {
    if (!rol || typeof rol !== 'object') {
      throw new Error('rol must be a valid object');
    }
    const response = await axios.post(API_URL, rol);
    return response.data;
  } catch (error) {
    console.error('Error creating rol:', error);
    throw error;
  }
};

export const updateRol = async (id_rol, rol) => {
  try {
    if (!id_rol) {
      throw new Error('id_rol is required');
    }
    if (!rol || typeof rol !== 'object') {
      throw new Error('rol must be a valid object');
    }
    const response = await axios.put(`${API_URL}/${id_rol}`, rol);
    return response.data;
  } catch (error) {
    console.error(`Error updating rol with id ${id_rol}:`, error);
    throw error;
  }
};

export const deleteRol = async (id_rol) => {
  try {
    if (!id_rol) {
      throw new Error('id_rol is required');
    }
    const response = await axios.delete(`${API_URL}/${id_rol}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting rol with id ${id_rol}:`, error);
    throw error;
  }
};

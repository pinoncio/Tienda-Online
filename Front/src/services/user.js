import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUser = async (id_usuario) => {
  try {
    if (!id_usuario) {
      throw new Error('id_usuario is required');
    }
    const response = await axios.get(`${API_URL}/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id_usuario}:`, error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    if (!user || typeof user !== 'object') {
      throw new Error('user must be a valid object');
    }
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id_usuario, user) => {
  try {
    if (!id_usuario) {
      throw new Error('id_usuario is required');
    }
    if (!user || typeof user !== 'object') {
      throw new Error('user must be a valid object');
    }
    const response = await axios.put(`${API_URL}/${id_usuario}`, user);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${id_usuario}:`, error);
    throw error;
  }
};

export const deleteUser = async (id_usuario) => {
  try {
    if (!id_usuario) {
      throw new Error('id_usuario is required');
    }
    const response = await axios.delete(`${API_URL}/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with id ${id_usuario}:`, error);
    throw error;
  }
};

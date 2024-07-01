import axios from 'axios';

const API_URL = 'http://localhost:3000/api/carro';

export const getCarritos = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching carritos:', error);
    throw error;  // rethrow the error if you need it to be handled further up the chain
  }
};

export const getCarrito = async (id_carro) => {
  try {
    if (!id_carro) {
      throw new Error('id_carro is required');
    }
    const response = await axios.get(`${API_URL}/${id_carro}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching carrito with id ${id_carro}:`, error);
    throw error;
  }
};

export const createCarrito = async (carrito) => {
  try {
    if (!carrito || typeof carrito !== 'object') {
      throw new Error('carrito must be a valid object');
    }
    const response = await axios.post(API_URL, carrito);
    return response.data;
  } catch (error) {
    console.error('Error creating carrito:', error);
    throw error;
  }
};

export const updateCarrito = async (id_carro, carrito) => {
  try {
    if (!id_carro) {
      throw new Error('id_carro is required');
    }
    if (!carrito || typeof carrito !== 'object') {
      throw new Error('carrito must be a valid object');
    }
    const response = await axios.put(`${API_URL}/${id_carro}`, carrito);
    return response.data;
  } catch (error) {
    console.error(`Error updating carrito with id ${id_carro}:`, error);
    throw error;
  }
};

export const deleteCarrito = async (id_carro) => {
  try {
    if (!id_carro) {
      throw new Error('id_carro is required');
    }
    const response = await axios.delete(`${API_URL}/${id_carro}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting carrito with id ${id_carro}:`, error);
    throw error;
  }
};

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/carro_productos';

export const getCarritosProductos = async (idUser) => {
  try {
    if (!idUser) {
      throw new Error('idUser is required');
    }
    const response = await axios.get(`${API_URL}/list/${idUser}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching carritos productos for idUser ${idUser}:`, error);
    throw error;
  }
};

export const getCarritoProducto = async (id_carro_productos) => {
  try {
    if (!id_carro_productos) {
      throw new Error('id_carro_productos is required');
    }
    const response = await axios.get(`${API_URL}/${id_carro_productos}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching carrito producto with id ${id_carro_productos}:`, error);
    throw error;
  }
};

export const updateCarritoProducto = async (id_carro_productos, carritoProducto) => {
  try {
    if (!id_carro_productos) {
      throw new Error('id_carro_productos is required');
    }
    if (!carritoProducto || typeof carritoProducto !== 'object') {
      throw new Error('carritoProducto must be a valid object');
    }
    const response = await axios.put(`${API_URL}/${id_carro_productos}`, carritoProducto);
    return response.data;
  } catch (error) {
    console.error(`Error updating carrito producto with id ${id_carro_productos}:`, error);
    throw error;
  }
};

export const deleteCarritoProducto = async (id_carro_productos) => {
  try {
    if (!id_carro_productos) {
      throw new Error('id_carro_productos is required');
    }
    const response = await axios.delete(`${API_URL}/${id_carro_productos}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting carrito producto with id ${id_carro_productos}:`, error);
    throw error;
  }
};

export const copiarCarritoProductoLocal = async (idUser, productos) => {
  try {
    if (!idUser) {
      throw new Error('idUser is required');
    }
    if (!productos || !Array.isArray(productos)) {
      throw new Error('productos must be a non-empty array');
    }
    const response = await axios.post(`${API_URL}/llenar`, { id_usuario: idUser, productos });
    return response.data;
  } catch (error) {
    console.error('Error copying local carrito producto:', error);
    throw error;
  }
};

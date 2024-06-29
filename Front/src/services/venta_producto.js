import axios from 'axios';

// Configura la URL base de tu API
const API_URL = 'http://localhost:3000/api/venta_producto';

// Obtiene todos los detalles de ventas
export const getVentasProducto = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de ventas:', error);
    throw error;
  }
};

// Obtiene un detalle de venta por ID
export const getVentaProducto = async (idVentaProducto) => {
  try {
    const response = await axios.get(`${API_URL}/${idVentaProducto}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el detalle de venta ${idVentaProducto}:`, error);
    throw error;
  }
};

// Elimina un detalle de venta por ID
export const deleteVentaProducto = async (idVentaProducto) => {
  try {
    const response = await axios.delete(`${API_URL}/${idVentaProducto}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el detalle de venta ${idVentaProducto}:`, error);
    throw error;
  }
};

// Actualiza un detalle de venta por ID
export const updateVentaProducto = async (idVentaProducto, data) => {
  try {
    const response = await axios.put(`${API_URL}/${idVentaProducto}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el detalle de venta ${idVentaProducto}:`, error);
    throw error;
  }
};

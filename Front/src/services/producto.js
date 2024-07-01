import axios from 'axios';

const API_URL = 'http://localhost:3000/api/producto';

export const getProductos = () => axios.get(`${API_URL}/list`);

export const createProducto = (producto) => axios.post(API_URL, producto);

export const updateProducto = (cod_producto, producto) => axios.put(`${API_URL}/${cod_producto}`, producto);

export const deleteProducto = (cod_producto) => axios.delete(`${API_URL}/${cod_producto}`);

export const getProducto = (cod_producto) => axios.get(`${API_URL}/${cod_producto}`);


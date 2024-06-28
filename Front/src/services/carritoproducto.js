import axios from 'axios';

const API_URL = 'http://localhost:3000/api/carro_productos';

export const getCarritosProductos = (idUser) => axios.get(`${API_URL}/list/${idUser}`);

export const getCarritoProducto = (id_carro_productos) => axios.get(`${API_URL}/${id_carro_productos}`);

export const updateCarritoProducto = (id_carro_productos, carritoProducto) => axios.put(`${API_URL}/${id_carro_productos}`, carritoProducto);

export const deleteCarritoProducto = (id_carro_productos) => axios.delete(`${API_URL}/${id_carro_productos}`);

export const copiarCarritoProductoLocal = (idUser, productos) => axios.post(`${API_URL}/llenar`, { id_usuario: idUser, productos });
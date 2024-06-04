import axios from 'axios';

const API_URL = 'http://localhost:3000/api/carro';

export const getCarritos = () => axios.get(`${API_URL}/list`);

export const getCarrito = (id_carro) => axios.get(`${API_URL}/${id_carro}`);

export const createCarrito = (carrito) => axios.post(API_URL, carrito);

export const updateCarrito = (id_carro, carrito) => axios.put(`${API_URL}/${id_carro}`, carrito);

export const deleteCarrito = (id_carro) => axios.delete(`${API_URL}/${id_carro}`);
// services/categoria.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/categoria';

export const getCategorias = () => axios.get(`${API_URL}/list`);

export const getCategoriaById = (id_categoria) => axios.get(`${API_URL}/${id_categoria}`);

export const createCategoria = (categoria) => axios.post(API_URL, categoria);

export const updateCategoria = (id_categoria, categoria) => axios.put(`${API_URL}/${id_categoria}`, categoria);

export const deleteCategoria = (id_categoria) => axios.delete(`${API_URL}/${id_categoria}`);

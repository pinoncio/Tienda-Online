import axios from 'axios';

const API_URL = 'http://localhost:3000/api/rol';

export const getRoles = () => axios.get(`${API_URL}/list`);

export const createRol = (rol) => axios.post(API_URL, rol);

export const updateRol = (id_rol, rol) => axios.put(`${API_URL}/${id_rol}`, rol);

export const deleteRol = (id_rol) => axios.delete(`${API_URL}/${id_rol}`);

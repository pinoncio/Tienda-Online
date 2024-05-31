
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const getUsers = () => axios.get(`${API_URL}/list`);

export const getUser = (id_usuario) => axios.get(`${API_URL}/${id_usuario}`);

export const createUser = (user) => axios.post(API_URL, user);

export const updateUser = (id_usuario, user) => axios.put(`${API_URL}/${id_usuario}`, user);

export const deleteUser = (id_usuario) => axios.delete(`${API_URL}/${id_usuario}`);

export const loginUser = (credentials) => axios.post(`${API_URL}/login`, credentials);

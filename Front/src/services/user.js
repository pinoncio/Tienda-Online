// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const getUsers = () => axios.get(`${API_URL}/list`);

export const getUser = (rut_usuario) => axios.get(`${API_URL}/${rut_usuario}`);

export const createUser = (user) => axios.post(API_URL, user);

export const updateUser = (rut_usuario, user) => axios.put(`${API_URL}/${rut_usuario}`, user);

export const deleteUser = (rut_usuario) => axios.delete(`${API_URL}/${rut_usuario}`);

export const loginUser = (credentials) => axios.post(`${API_URL}/login`, credentials);

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/venta';

export const newVenta = (idUser) => axios.post(`${API_URL}/${idUser}`);
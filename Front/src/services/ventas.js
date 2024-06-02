import axios from 'axios';

const API_URL = 'http://localhost:3000/api/ventas';

export const getVentas = () => axios.get(`${API_URL}/list`);

export const createVenta = (venta) => axios.post(API_URL, venta);

export const updateVenta = (id_venta, venta) => axios.put(`${API_URL}/${id_venta}`, venta);

export const deleteVenta = (id_venta) => axios.delete(`${API_URL}/${id_venta}`);
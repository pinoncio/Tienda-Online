import axios from 'axios';

const API_URL = 'http://localhost:3000/api/venta_producto';

export const getDesempeno = async () => {
    try {
        const response = await axios.get(`${API_URL}/reporte/desempeno`);
        return response.data;
    } catch (error) {
        console.error('Error fetching desempeño:', error);
        throw error;
    }
};
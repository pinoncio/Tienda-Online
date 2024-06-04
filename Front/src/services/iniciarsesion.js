import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptar respuestas
api.interceptors.response.use(
    (response) => {
      // Si la respuesta tiene un token y un rol, los extraemos y los guardamos en el localStorage
      if (response.data && response.data.token && response.data.rol) {
        const { token, rol } = response.data;
        console.log('Datos recibidos del servidor:', response.data); // Agregamos el console.log
        localStorage.setItem('token', token);
        localStorage.setItem('rol', rol);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

// Función para iniciar sesión
export const loginUser = (credentials) => api.post('/login', credentials);

export default api;

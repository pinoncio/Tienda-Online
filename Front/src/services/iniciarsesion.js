import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptar respuestas
api.interceptors.response.use(
  (response) => {
    // Si la respuesta tiene un token, un rol y un idUser, los extraemos y los guardamos en el localStorage
    if (response.data && response.data.token && response.data.rol && response.data.idUser) {
      const { token, rol, idUser } = response.data;
      console.log('Datos recibidos del servidor:', response.data);
      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol);
      localStorage.setItem('idUser', idUser); // Almacenar el idUser en el localStorage
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

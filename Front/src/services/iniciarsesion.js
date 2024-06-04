
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const loginUser = (credentials) => axios.post(`${API_URL}/login`, credentials);
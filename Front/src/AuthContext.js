// src/AuthContext.js
import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Verificar autenticación al cargar el componente
    const token = localStorage.getItem('token');
    return !!token;
  });

  useEffect(() => {
    // Interceptor para agregar el token a las solicitudes
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para manejar respuestas de error (401 Unauthorized)
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Redirigir a la página de inicio de sesión o realizar alguna acción
          logout(); // Por ejemplo, cerrar sesión automáticamente
        }
        return Promise.reject(error);
      }
    );
  }, []); // Ejecutar solo una vez al montar el componente

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
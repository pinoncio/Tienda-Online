import React, { useState, useContext } from 'react';
import { loginUser } from '../services/iniciarsesion';
import { useNavigate } from 'react-router-dom';
import '../styles/iniciarsesion.css';
import { AuthContext } from '../AuthContext';

const IniciarSesion = () => {
  const [errors, setErrors] = useState({
    email: false,
    contraseña: false,
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value === '',
    }));
  };
//d
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, contraseña } = event.target.elements;
  
    try {
      const response = await loginUser({ correo: email.value, contrasena: contraseña.value });
      if (response.data.token) {
        login(response.data.token);
        navigate('/');
      } else {
        setErrors({
          email: true,
          contraseña: true,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        email: true,
        contraseña: true,
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            onBlur={handleBlur} 
          />
          {errors.email && <span className="error-message">El campo es obligatorio o incorrecto</span>}
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña</label>
          <input 
            type="password" 
            id="contraseña" 
            name="contraseña" 
            required 
            onBlur={handleBlur} 
          />
          {errors.contraseña && <span className="error-message">El campo es obligatorio o incorrecto</span>}
        </div>
        <div className="form-group">
          <input type="submit" value="Iniciar Sesión" className="submit-button" />
        </div>
      </form>
    </div>
  );
}

export { IniciarSesion };

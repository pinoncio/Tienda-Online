// src/pages/IniciarSesion.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/iniciarsesion.css';
import { AuthContext } from '../AuthContext';

const IniciarSesion = () => {
  const [errors, setErrors] = useState({
    rut: false,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const { rut, contraseña } = event.target.elements;
    
    if (rut.value && contraseña.value) {
      login();
      navigate('/');
    } else {
      setErrors({
        rut: rut.value === '',
        contraseña: contraseña.value === '',
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rut">Rut</label>
          <input 
            type="text" 
            id="rut" 
            name="rut" 
            required 
            onBlur={handleBlur} 
          />
          {errors.rut && <span className="error-message">El campo es obligatorio</span>}
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
          {errors.contraseña && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <input type="submit" value="Iniciar Sesión" className="submit-button" />
        </div>
      </form>
    </div>
  );
}

export { IniciarSesion };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, contraseña } = event.target.elements;

    if (email.value && contraseña.value) {
      try {
        const response = await loginUser(email.value, contraseña.value);
        if (response.success) {
          login(response.data);
          navigate('/');
        } else {
          setErrors({
            email: !response.success,
            contraseña: !response.success,
          });
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({
          email: true,
          contraseña: true,
        });
      }
    } else {
      setErrors({
        email: email.value === '',
        contraseña: contraseña.value === '',
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

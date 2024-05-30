import React, { useState } from 'react';
import './iniciarsesion.css';

const IniciarSesion = () => {
  const [errors, setErrors] = useState({
    rut: false,
    contraseña: false,
  });

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value === '',
    }));
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form action="/ruta/a/tu/servidor" method="post">
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

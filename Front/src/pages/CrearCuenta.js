import React, { useState } from 'react';
import '../styles/crearcuenta.css';

const CrearCuenta = () => {
  const [errors, setErrors] = useState({
    nombre: false,
    apellido1: false,
    apellido2: false,
    rut: false,
    direccion: false,
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
      <h2>Crear Cuenta</h2>
      <form action="/ruta/a/tu/servidor" method="post">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input 
            type="text" 
            id="nombre" 
            name="nombre" 
            required 
            onBlur={handleBlur} 
          />
          {errors.nombre && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="apellido1">Apellido 1</label>
          <input 
            type="text" 
            id="apellido1" 
            name="apellido1" 
            required 
            onBlur={handleBlur} 
          />
          {errors.apellido1 && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="apellido2">Apellido 2</label>
          <input 
            type="text" 
            id="apellido2" 
            name="apellido2" 
            required 
            onBlur={handleBlur} 
          />
          {errors.apellido2 && <span className="error-message">El campo es obligatorio</span>}
        </div>
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
          <label htmlFor="direccion">Dirección</label>
          <input 
            type="text" 
            id="direccion" 
            name="direccion" 
            required 
            onBlur={handleBlur} 
          />
          {errors.direccion && <span className="error-message">El campo es obligatorio</span>}
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
          <input type="submit" value="Crear Cuenta" />
        </div>
      </form>
    </div>
  );
}

export { CrearCuenta };

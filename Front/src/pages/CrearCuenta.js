import React from 'react';
import { useCreateUserForm } from '../components/createuser';
import '../styles/crearcuenta.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrearCuenta = () => {
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useCreateUserForm();

  return (
    <div className="form-container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre_usuario">Nombre</label>
          <input
            type="text"
            id="nombre_usuario"
            name="nombre_usuario"
            value={formData.nombre_usuario}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.nombre_usuario && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="apellido1_usuario">Apellido 1</label>
          <input
            type="text"
            id="apellido1_usuario"
            name="apellido1_usuario"
            value={formData.apellido1_usuario}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.apellido1_usuario && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="apellido2_usuario">Apellido 2</label>
          <input
            type="text"
            id="apellido2_usuario"
            name="apellido2_usuario"
            value={formData.apellido2_usuario}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.apellido2_usuario && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="rut_usuario">Rut</label>
          <input
            type="text"
            id="rut_usuario"
            name="rut_usuario"
            value={formData.rut_usuario}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.rut_usuario && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.direccion && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.contrasena && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.correo && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <input type="submit" value="Crear Cuenta" />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export { CrearCuenta };

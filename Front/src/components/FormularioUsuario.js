// components/FormularioUsuario.js
import React from 'react';
import '../styles/formulario.css';

const FormularioUsuario = ({ form, handleChange, handleSubmit, isEditing, onCancel }) => {
  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="rut_usuario">RUT:</label>
        <input id="rut_usuario" name="rut_usuario" value={form.rut_usuario} onChange={handleChange} placeholder="RUT" disabled={isEditing} />
      </div>
      <div className="form-group">
        <label htmlFor="contrasena">Contraseña:</label>
        <input id="contrasena" name="contrasena" type="password" value={form.contrasena} onChange={handleChange} placeholder="Contraseña" />
      </div>
      <div className="form-group">
        <label htmlFor="nombre_usuario">Nombre:</label>
        <input id="nombre_usuario" name="nombre_usuario" value={form.nombre_usuario} onChange={handleChange} placeholder="Nombre" />
      </div>
      <div className="form-group">
        <label htmlFor="apellido1_usuario">Apellido Paterno:</label>
        <input id="apellido1_usuario" name="apellido1_usuario" value={form.apellido1_usuario} onChange={handleChange} placeholder="Apellido Paterno" />
      </div>
      <div className="form-group">
        <label htmlFor="apellido2_usuario">Apellido Materno:</label>
        <input id="apellido2_usuario" name="apellido2_usuario" value={form.apellido2_usuario} onChange={handleChange} placeholder="Apellido Materno" />
      </div>
      <div className="form-group">
        <label htmlFor="direccion">Dirección:</label>
        <input id="direccion" name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" />
      </div>
      <div className="form-group">
        <label htmlFor="id_rol">ID Rol:</label>
        <input id="id_rol" name="id_rol" value={form.id_rol} onChange={handleChange} placeholder="ID Rol" />
      </div>
      <div className="buttons">
        <button type="submit" className="btn-submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
        <button type="button" onClick={onCancel} className="btn-cancel">Cancelar</button>
      </div>
    </form>
  );
};

export default FormularioUsuario;

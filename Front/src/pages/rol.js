import React from 'react';
import { useRoles } from '../components/createrol';
import { useNavigate } from 'react-router-dom'; 
import '../styles/rol.css';

const Rol = () => {
  const navigate = useNavigate(); 

  const {
    roles,
    editMode,
    editedRol,
    handleDelete,
    handleEdit,
    handleCreate,
    handleSubmit,
    handleChange,
    setEditMode,
  } = useRoles();

  const handleBack = () => {
    navigate('/admin'); 
  };

  return (
    <div className="container">
      <h1>Lista de Roles</h1>
      <button onClick={handleBack}>Volver</button> {}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((rol) => (
            <tr key={rol.id_rol}>
              <td>{rol.id_rol}</td>
              <td>{rol.nombre_rol}</td>
              <td>
                <button onClick={() => handleEdit(rol)}>Editar</button>
                <button onClick={() => handleDelete(rol.id_rol)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreate}>Crear Rol</button>
      {editMode && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre_rol"
            value={editedRol.nombre_rol}
            onChange={handleChange}
            placeholder="Nombre del Rol"
          />
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default Rol;

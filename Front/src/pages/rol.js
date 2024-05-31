import React, { useState, useEffect } from 'react';
import { createRol, getRoles, deleteRol, updateRol } from '../services/rol';
import '../styles/user.css';

const Rol = () => {
    const [roles, setRoles] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedRol, setEditedRol] = useState({
      id_rol: '',
      nombre_rol: ''
    });
  
    useEffect(() => {
      // Carga la lista de roles cuando el componente se monta
      loadRoles();
    }, []);
  
    const loadRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
  
    const handleDelete = async (id_rol) => {
      try {
        await deleteRol(id_rol);
        // Actualiza la lista de roles después de borrar uno
        loadRoles();
      } catch (error) {
        console.error('Error deleting role:', error);
      }
    };
  
    const handleEdit = (rol) => {
      setEditMode(true);
      setEditedRol(rol);
    };
  
    const handleCreate = () => {
      setEditMode(true);
      setEditedRol({
        id_rol: '',
        nombre_rol: ''
      });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        if (editedRol.id_rol) {
          await updateRol(editedRol.id_rol, editedRol);
        } else {
          await createRol(editedRol);
        }
        loadRoles();
        setEditMode(false); // Salir del modo de edición después de enviar el formulario
      } catch (error) {
        console.error('Error updating/creating role:', error);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setEditedRol({
        ...editedRol,
        [name]: value
      });
    };
  
    return (
      <div className="container">
        <h1>Lista de Roles</h1>
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
            <input type="text" name="nombre_rol" value={editedRol.nombre_rol} onChange={handleChange} placeholder="Nombre del Rol" />
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setEditMode(false)}>Cancelar</button> {/* Agregar botón de cancelar */}
          </form>
        )}
      </div>
    );
  };
  
  export default Rol;
  
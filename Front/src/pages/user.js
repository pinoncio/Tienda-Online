import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser } from '../services/user';
import { getRoles } from '../services/rol';
import '../styles/user.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    id_usuario: '',
    rut_usuario: '',
    nombre_usuario: '',
    apellido1_usuario: '',
    apellido2_usuario: '',
    direccion: '',
    correo: '',
    contrasena: '', 
    id_rol: ''
  });

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const loadRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleDelete = async (id_usuario) => {
    try {
      await deleteUser(id_usuario);
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setEditedUser(user);
  };

  const handleCreate = () => {
    setEditMode(false);
    setEditedUser({
      id_usuario: '',
      rut_usuario: '',
      nombre_usuario: '',
      apellido1_usuario: '',
      apellido2_usuario: '',
      direccion: '',
      correo: '',
      contrasena: '', 
      id_rol: ''
    });
  };

  const handleUpdate = async () => {
    try {
      const { id_usuario, nombre_usuario, apellido1_usuario, apellido2_usuario, direccion, correo, contrasena, id_rol } = editedUser;
      // Filtrar los campos que se enviarán en la solicitud de actualización
      const updatedUserData = { nombre_usuario, apellido1_usuario, apellido2_usuario, direccion, correo, contrasena, id_rol };
      await updateUser(id_usuario, updatedUserData);
      loadUsers();
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
    }
  };
  
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("handleChange:", name, value); 
    setEditedUser({
      ...editedUser,
      [name]: value
    });
  };
  

  const getRolNombre = (id_rol) => {
    const rol = roles.find((rol) => rol.id_rol === id_rol);
    return rol ? rol.nombre_rol : 'Desconocido';
  };

  return (
    <div className="container">
      <h1>Lista de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Dirección</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id_usuario}>
              <td>{user.rut_usuario}</td>
              <td>{user.nombre_usuario}</td>
              <td>{`${user.apellido1_usuario} ${user.apellido2_usuario}`}</td>
              <td>{user.direccion}</td>
              <td>{user.correo}</td>
              <td>{getRolNombre(user.id_rol)}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button className="delete-button" onClick={() => handleDelete(user.id_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="create-button" onClick={handleCreate}>Crear Usuario</button>
      {editMode && (
        <form onSubmit={handleUpdate} className="edit-form">
          <div className="form-section">
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" name="nombre_usuario" value={editedUser.nombre_usuario} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Primer Apellido</label>
              <input type="text" name="apellido1_usuario" value={editedUser.apellido1_usuario} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Segundo Apellido</label>
              <input type="text" name="apellido2_usuario" value={editedUser.apellido2_usuario} onChange={handleChange} />
            </div>
          </div>
          <div className="form-section">
            <div className="form-group">
              <label>Dirección</label>
              <input type="text" name="direccion" value={editedUser.direccion} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email" name="correo" value={editedUser.correo} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" name="contrasena" value={editedUser.contrasena} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Rol</label>
              <select name="id_rol" value={editedUser.id_rol} onChange={handleChange}>
                <option value="">Seleccione un rol</option>
                {roles.map((rol) => (
                  <option key={rol.id_rol} value={rol.id_rol}>
                    {rol.nombre_rol}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="button" onClick={handleUpdate}>Guardar</button>
        </form>
      )}
    </div>
  );
};

export default User;

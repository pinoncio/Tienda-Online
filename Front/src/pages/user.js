import React, { useState, useEffect } from 'react';
import { loadUsers, loadRoles, deleteUserHandler, updateUserHandler } from '../components/createusers'; 
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
  const [createMode, setCreateMode] = useState(false); 

  useEffect(() => {
    loadUsers(setUsers);
    loadRoles(setRoles);
  }, []);

  const handleDelete = async (id_usuario) => {
    await deleteUserHandler(id_usuario, () => loadUsers(setUsers));
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setEditedUser(user);
  };

  const handleCreate = () => {
    setCreateMode(true);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateUserHandler(editedUser, editMode, createMode, () => loadUsers(setUsers), setEditMode, setCreateMode);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value
    });
  };

  const handleCancel = () => {
    setEditMode(false);
    setCreateMode(false);
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
      <button className="create-button" onClick={handleCreate}>Crear</button>
      {(editMode || createMode) && (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-section">
            <div className="form-group">
              <label>RUT</label>
              <input type="text" name="rut_usuario" value={editedUser.rut_usuario} onChange={handleChange} />
            </div>
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
          <div className="form-buttons">
            <button type="submit">{editMode ? "Guardar" : "Crear"}</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default User;

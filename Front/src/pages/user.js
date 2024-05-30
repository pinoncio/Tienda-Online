import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/user';
import FormularioUsuario from '../components/FormularioUsuario';
import '../styles/user.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    rut_usuario: '',
    contrasena: '',
    nombre_usuario: '',
    apellido1_usuario: '',
    apellido2_usuario: '',
    direccion: '',
    id_rol: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    getUsers().then(response => {
      setUsers(response.data);
    }).catch(error => {
      console.error('Error fetching users:', error);
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateUser(form.rut_usuario, form).then(response => {
        console.log('Usuario actualizado:', response.data);
        fetchUsers();
        resetForm();
      }).catch(error => {
        console.error('Error actualizando usuario:', error);
      });
    } else {
      createUser(form).then(response => {
        console.log('Usuario creado:', response.data);
        fetchUsers();
        resetForm();
      }).catch(error => {
        console.error('Error creando usuario:', error);
      });
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setIsEditing(true);
    setShowCreateForm(true);
  };

  const handleDelete = (rut_usuario) => {
    deleteUser(rut_usuario).then(response => {
      console.log('Usuario eliminado:', response.data);
      fetchUsers();
    }).catch(error => {
      console.error('Error eliminando usuario:', error);
    });
  };

  const resetForm = () => {
    setForm({
      rut_usuario: '',
      contrasena: '',
      nombre_usuario: '',
      apellido1_usuario: '',
      apellido2_usuario: '',
      direccion: '',
      id_rol: ''
    });
    setIsEditing(false);
    setShowCreateForm(false);
  };

  const handleCancel = () => {
    resetForm();
    setShowCreateForm(false);
  };

  // Filtrar usuarios por término de búsqueda
  const filteredUsers = users.filter(user =>
  (user.nombre_usuario && user.nombre_usuario.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (user.apellido1_usuario && user.apellido1_usuario.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (user.apellido2_usuario && user.apellido2_usuario.toLowerCase().includes(searchTerm.toLowerCase()))
);

return (
    <div className="container">
      <h1>Gestión de Usuarios</h1>
      <button onClick={() => setShowCreateForm(true)}>Agregar nuevo usuario</button>
      {showCreateForm && (
        <FormularioUsuario
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
          onCancel={handleCancel}
        />
      )}
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.rut_usuario}>
              <td>{user.nombre_usuario}</td>
              <td>{user.apellido1_usuario}</td>
              <td>{user.apellido2_usuario}</td>
              <td className="actions">
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button onClick={() => handleDelete(user.rut_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

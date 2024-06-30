import React, { useState, useEffect } from 'react';
import { updateUser } from '../services/user';
import { getUser} from '../services/perfil';
import '../styles/perfilUsuario.css'

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    rut_usuario: '',
    nombre_usuario: '',
    apellido1_usuario: '',
    apellido2_usuario: '',
    direccion: '',
    correo: '',
    contrasena: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const idUser = localStorage.getItem('idUser');
    setIsLoading(true);

    const fetchUsuario = async () => {
      try {
        if (!idUser) {
          throw new Error('ID de usuario no encontrado en localStorage');
        }

        const userData = await getUser(idUser);
        
        if (!userData) {
          throw new Error('No se encontraron datos del usuario');
        }

        setUsuario(userData);
        setFormData(userData);
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const idUser = localStorage.getItem('idUser');
      await updateUser(idUser, formData);
      setUsuario(formData);
      setEditMode(false);
    } catch (error) {
      console.error('Error al actualizar datos del usuario:', error);
      setError('Error al actualizar los datos. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="perfil-usuario">
      <h2>Perfil de Usuario</h2>

      {isLoading ? (
        <p>Cargando datos del usuario...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : usuario ? (
        <form onSubmit={handleSubmit} key={editMode}>
          <div>
            <label htmlFor="rut_usuario">RUT:</label>
            <input
              type="text"
              id="rut_usuario"
              name="rut_usuario"
              value={editMode ? formData.rut_usuario : usuario?.rut_usuario}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
          <div>
            <label htmlFor="nombre_usuario">Nombre:</label>
            <input
              type="text"
              id="nombre_usuario"
              name="nombre_usuario"
              value={editMode ? formData.nombre_usuario : usuario?.nombre_usuario}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
          <div>
            <label htmlFor="apellido1_usuario">Apellido Paterno:</label>
            <input
              type="text"
              id="apellido1_usuario"
              name="apellido1_usuario"
              value={editMode ? formData.apellido1_usuario : usuario?.apellido1_usuario}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
          <div>
            <label htmlFor="apellido2_usuario">Apellido Materno:</label>
            <input
              type="text"
              id="apellido2_usuario"
              name="apellido2_usuario"
              value={editMode ? formData.apellido2_usuario : usuario?.apellido2_usuario}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
          <div>
            <label htmlFor="contrasena">Contraseña:</label>
            <div className="password-input">
              <input
                type={"password"}
                id="contrasena"
                name="contrasena"
                value={formData.contrasena} 
                onChange={handleChange}
                disabled={!editMode}
              />

            </div>
          </div>
          <div>
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={editMode ? formData.direccion : usuario?.direccion}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
          <div>
            <label htmlFor="correo">Correo:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={editMode ? formData.correo : usuario?.correo}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
          {editMode ? (
            <button type="submit">Guardar Cambios</button> 
          ) : (
            <button type="button" onClick={() => setEditMode(true)}>Editar</button>
          )}
        </form>
      ) : (
        <p>No se encontraron datos del usuario.</p>
      )}
    </div>
  );
};

export default PerfilUsuario;

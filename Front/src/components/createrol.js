import { useState, useEffect } from 'react';
import { createRol, getRoles, deleteRol, updateRol } from '../services/rol';

export const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedRol, setEditedRol] = useState({
    id_rol: '',
    nombre_rol: ''
  });

  useEffect(() => {
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
      setEditMode(false);
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

  return {
    roles,
    editMode,
    editedRol,
    handleDelete,
    handleEdit,
    handleCreate,
    handleSubmit,
    handleChange,
    setEditMode,
  };
};

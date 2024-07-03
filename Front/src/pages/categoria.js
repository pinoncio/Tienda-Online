import React, { useState, useEffect } from 'react';
import { getCategorias, deleteCategoria, createCategoria, updateCategoria } from '../services/categoria';
import '../styles/categoria.css';

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedCategoria, setEditedCategoria] = useState({
    id_categoria: '',
    nombre_categoria: '',
    estado_categoria: false
  });

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const response = await getCategorias();
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categorías:', error);
    }
  };

  const handleDelete = async (id_categoria) => {
    try {
      await deleteCategoria(id_categoria);
      loadCategorias();
    } catch (error) {
      console.error('Error deleting categoría:', error);
    }
  };

  const handleEdit = (categoria) => {
    setEditMode(true);
    setEditedCategoria(categoria);
  };

  const handleCreate = () => {
    setEditMode(true);
    setEditedCategoria({
      id_categoria: '',
      nombre_categoria: '',
      estado_categoria: true
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editedCategoria.id_categoria) {
        await updateCategoria(editedCategoria.id_categoria, editedCategoria);
      } else {
        await createCategoria(editedCategoria);
      }
      loadCategorias();
      setEditMode(false); 
    } catch (error) {
      console.error('Error updating/creating categoría:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setEditedCategoria({
      ...editedCategoria,
      [name]: newValue
    });
  };

  return (
    <div className="container">
      <h1>Lista de Categorías</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id_categoria}>
              <td>{categoria.id_categoria}</td>
              <td>{categoria.nombre_categoria}</td>
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="estado_categoria"
                    checked={editedCategoria.id_categoria === categoria.id_categoria ? editedCategoria.estado_categoria : categoria.estado_categoria}
                    onChange={handleChange}
                  />
                  <span className="slider round"></span>
                </label>
              </td>
              <td>
                <button id ="editar" onClick={() => handleEdit(categoria)}>Editar</button>
                <button id ="eliminar" onClick={() => handleDelete(categoria.id_categoria)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button id ="crear" onClick={handleCreate}>Crear Categoría</button>
      {editMode && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre_categoria" value={editedCategoria.nombre_categoria} onChange={handleChange} placeholder="Nombre de la Categoría" />
          <button id ="guardar" type="submit">Guardar</button>
          <button type="button" id ="cancelar" onClick={() => setEditMode(false)}>Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default Categoria;

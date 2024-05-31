import React, { useState, useEffect } from 'react';
import { getCategorias, deleteCategoria, createCategoria, updateCategoria } from '../services/categoria';
import '../styles/user.css';

const Categoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedCategoria, setEditedCategoria] = useState({
      id_categoria: '',
      nombre_categoria: '',
      estado_categoria: ''
    });
  
    useEffect(() => {
      // Carga la lista de categorías cuando el componente se monta
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
        // Actualiza la lista de categorías después de borrar una
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
        estado_categoria: ''
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
        setEditMode(false); // Salir del modo de edición después de enviar el formulario
      } catch (error) {
        console.error('Error updating/creating categoría:', error);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setEditedCategoria({
        ...editedCategoria,
        [name]: value
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
                <td>{categoria.estado_categoria}</td>
                <td>
                  <button onClick={() => handleEdit(categoria)}>Editar</button>
                  <button onClick={() => handleDelete(categoria.id_categoria)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleCreate}>Crear Categoría</button>
        {editMode && (
          <form onSubmit={handleSubmit}>
            <input type="text" name="nombre_categoria" value={editedCategoria.nombre_categoria} onChange={handleChange} placeholder="Nombre de la Categoría" />
            <input type="text" name="estado_categoria" value={editedCategoria.estado_categoria} onChange={handleChange} placeholder="Estado de la Categoría" />
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setEditMode(false)}>Cancelar</button> {/* Agregar botón de cancelar */}
          </form>
        )}
      </div>
    );
  };
  
  export default Categoria;

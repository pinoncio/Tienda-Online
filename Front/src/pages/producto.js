import React, { useState, useEffect } from 'react';
import { getProductos, deleteProducto, createProducto, updateProducto } from '../services/producto';
import '../styles/producto.css';

const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedProducto, setEditedProducto] = useState({
    cod_producto: '',
    nombre_producto: '',
    precio_producto: '',
    cantidad_total: '',
    cantidad_disponible: '',
    descripcion_producto: '',
    imagen: '',
    id_categoria: ''
  });

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const response = await getProductos();
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching productos:', error);
    }
  };

  const handleDelete = async (cod_producto) => {
    try {
      await deleteProducto(cod_producto);
      loadProductos();
    } catch (error) {
      console.error('Error deleting producto:', error);
    }
  };

  const handleEdit = (producto) => {
    setEditMode(true);
    setEditedProducto(producto);
  };

  const handleCreate = () => {
    setEditMode(true);
    setEditedProducto({
      cod_producto: '',
      nombre_producto: '',
      precio_producto: '',
      cantidad_total: '',
      cantidad_disponible: '',
      descripcion_producto: '',
      imagen: '',
      id_categoria: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editedProducto.cod_producto) {
        await updateProducto(editedProducto.cod_producto, editedProducto);
      } else {
        await createProducto(editedProducto);
      }
      loadProductos();
      setEditMode(false);
    } catch (error) {
      console.error('Error updating/creating producto:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedProducto({
      ...editedProducto,
      [name]: value
    });
  };

  return (
    <div className="container">
      <h1>Lista de Productos</h1>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad Total</th>
            <th>Cantidad Disponible</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>ID Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.cod_producto}>
              <td>{producto.cod_producto}</td>
              <td>{producto.nombre_producto}</td>
              <td>{producto.precio_producto}</td>
              <td>{producto.cantidad_total}</td>
              <td>{producto.cantidad_disponible}</td>
              <td>{producto.descripcion_producto}</td>
              <td><img src={producto.imagen} alt={producto.nombre_producto} width="50"/></td>
              <td>{producto.id_categoria}</td>
              <td>
                <button onClick={() => handleEdit(producto)}>Editar Producto</button>
                <button onClick={() => handleDelete(producto.cod_producto)}>Eliminar Producto</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreate}>Crear Producto</button>
      {editMode && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre_producto" value={editedProducto.nombre_producto} onChange={handleChange} placeholder="Nombre del Producto" />
          <input type="text" name="precio_producto" value={editedProducto.precio_producto} onChange={handleChange} placeholder="Precio del Producto" />
          <input type="text" name="cantidad_total" value={editedProducto.cantidad_total} onChange={handleChange} placeholder="Cantidad Total" />
          <input type="text" name="cantidad_disponible" value={editedProducto.cantidad_disponible} onChange={handleChange} placeholder="Cantidad Disponible" />
          <textarea name="descripcion_producto" value={editedProducto.descripcion_producto} onChange={handleChange} placeholder="Descripción del Producto"></textarea>
          <input type="text" name="imagen" value={editedProducto.imagen} onChange={handleChange} placeholder="URL de la Imagen" />
          <input type="text" name="id_categoria" value={editedProducto.id_categoria} onChange={handleChange} placeholder="ID de la Categoría" />
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default Producto;

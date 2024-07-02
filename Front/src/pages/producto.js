import React, { useState, useEffect } from 'react';
import { getProductos, deleteProducto, createProducto, updateProducto } from '../services/producto';
import '../styles/producto.css';


const SERVER_BASE_URL = 'http://localhost:3000/';

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
    imagen: null, 
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
      console.error('Error al obtener productos:', error);
    }
  };

  const handleDelete = async (cod_producto) => {
    try {
      await deleteProducto(cod_producto);
      loadProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const handleEdit = (producto) => {
    setEditMode(true);
    setEditedProducto({ ...producto, imagen: null });
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
      imagen: null, 
      id_categoria: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nombre_producto', editedProducto.nombre_producto);
    formData.append('precio_producto', editedProducto.precio_producto);
    formData.append('cantidad_total', editedProducto.cantidad_total);
    formData.append('cantidad_disponible', editedProducto.cantidad_disponible);
    formData.append('descripcion_producto', editedProducto.descripcion_producto);
    formData.append('id_categoria', editedProducto.id_categoria);

    if (editedProducto.imagen) {
      formData.append('imagen', editedProducto.imagen);
    }

    try {
      if (editedProducto.cod_producto) {
        await updateProducto(editedProducto.cod_producto, formData);
      } else {
        await createProducto(formData);
      }
      loadProductos();
      setEditMode(false);
    } catch (error) {
      console.error('Error al actualizar/crear producto:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedProducto({
      ...editedProducto,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setEditedProducto({
      ...editedProducto,
      imagen: file
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => {
              const imageUrl = new URL(producto.imagen, SERVER_BASE_URL).href;
              console.log("URL de la imagen:", imageUrl);
              return (
              <tr key={producto.cod_producto}>
                <td>{producto.cod_producto}</td>
                <td>{producto.nombre_producto}</td>
                <td>{producto.precio_producto}</td>
                <td>{producto.cantidad_total}</td>
                <td>{producto.cantidad_disponible}</td>
                <td>{producto.descripcion_producto}</td>

                <td>
                  {producto.imagen && (
                    <img src={imageUrl} alt={producto.nombre_producto} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(producto)}>Editar Producto</button>
                  <button onClick={() => handleDelete(producto.cod_producto)}>Eliminar Producto</button>
                </td>
              </tr>
            );
          })}
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
          <input type="file" name="imagen" onChange={handleFileChange} />
          <input type="text" name="id_categoria" value={editedProducto.id_categoria} onChange={handleChange} placeholder="ID de la Categoría" />
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancelar</button>
        </form>
      )}
    </div>
 

  );
  
};


export default Producto;
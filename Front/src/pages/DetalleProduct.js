import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducto } from '../services/producto';
import '../styles/detalleProducto.css';

const SERVER_BASE_URL = 'http://localhost:3000/';

const DetalleProduct = () => {
  const { cod_producto } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await getProducto(cod_producto);
        setProducto(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error :', error);
        setLoading(false);
      }
    };

    fetchProducto();
  }, [cod_producto]);

  if (loading) {
    return <div>Cargando producto...</div>;
  }

  if (!producto) {
    return <div>No se encontró el producto.</div>;
  }

  const imageUrl = new URL(producto.imagen, SERVER_BASE_URL).href;

  return (
    <div className="detalle-producto">
      <div className='titulo'>
        <h2>{producto.nombre_producto}</h2>
      </div>
      <div className='body'>
        <img src={imageUrl} alt={producto.nombre_producto} />
        <p>Precio: {producto.precio_producto}</p>
        <p>Descripción: {producto.descripcion_producto}</p>
      </div>
    </div>
  );
};

export { DetalleProduct };

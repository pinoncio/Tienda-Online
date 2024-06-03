import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducto } from '../services/producto';

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
        console.error('Error fetching producto:', error);
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

  return (
    <div className="detalle-producto">
      <h2>{producto.nombre_producto}</h2>
      <img src={producto.imagen} alt={producto.nombre_producto} />
      <p>Precio: {producto.precio_producto}</p>
      <p>Descripción: {producto.descripcion_producto}</p>
    </div>
  );
};

export {DetalleProduct};

import React from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams para obtener el código del producto de la URL

const DetalleProduct = () => {
  const { cod_producto } = useParams(); // Obtiene el código del producto de la URL

  // Lógica para cargar los detalles del producto utilizando el código obtenido
  
  return (
    <div>
      {/* Muestra los detalles del producto */}
      <h1>Detalles del Producto</h1>
      <p>Código del Producto: {cod_producto}</p>
      {/* Mostrar el resto de los detalles del producto */}
    </div>
  );
};

export {DetalleProduct} ;

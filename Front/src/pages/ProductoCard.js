import React from 'react';
import { Link } from 'react-router-dom'; 

const ProductoCard = ({ producto }) => {
  return (
    <div className="container-producto">
      <div className="tarjeta-producto">
        <h3>{producto.nombre_producto}</h3> 
        <Link to={`/detalle-producto/${producto.cod_producto}`}> 
          <img src={producto.imagen} alt={producto.nombre_producto} />
        </Link>
        <p>Precio: {producto.precio_producto}</p>
      </div>
    </div>
  );
};

export default ProductoCard;

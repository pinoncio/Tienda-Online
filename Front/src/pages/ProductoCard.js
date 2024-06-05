import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/catalogo.css';

const SERVER_BASE_URL = 'http://localhost:3000/';

  const ProductoCard = ({ producto }) => {
  
    const imageUrl = new URL(producto.imagen, SERVER_BASE_URL).href;
  const addToCart = () => {
    // Aquí puedes agregar la lógica para añadir el producto al carrito
    console.log(`Añadir ${producto.nombre_producto} al carrito`);
  };
  return (
    <div className="container-producto">
      <div className="tarjeta-producto">
        <h3>{producto.nombre_producto}</h3> 
        <Link to={`/detalle-producto/${producto.cod_producto}`}> 
          <img src={imageUrl} alt={producto.nombre_producto} style={{ maxWidth: '100px', maxHeight: '100px' }} />
        </Link>
        <p>Precio: {producto.precio_producto}</p>
        <button onClick={addToCart}>Añadir al carrito</button>
      </div>
    </div>
  );
};

export default ProductoCard;
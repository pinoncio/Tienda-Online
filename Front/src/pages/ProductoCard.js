import React from 'react';
import { Link } from 'react-router-dom';
import { createCarrito } from '../services/carrito'; // Importa la función para crear un carrito
import '../styles/catalogo.css';

const SERVER_BASE_URL = 'http://localhost:3000/';

const ProductoCard = ({ producto }) => {
  const imageUrl = new URL(producto.imagen, SERVER_BASE_URL).href;

  const addToCart = async () => {
    try {
      // Obtener el id del usuario del localStorage (suponiendo que lo guardaste previamente)
      const idUsuario = localStorage.getItem('idUser');

      // Crear el objeto de carrito a enviar al backend
      const carrito = {
        id_usuario: idUsuario,
        cantidad: 1, // Puedes ajustar la cantidad según sea necesario
        cod_producto: producto.cod_producto,
      };

      // Realizar la solicitud POST para agregar el producto al carrito
      await createCarrito(carrito);

      // Opcional: mostrar algún mensaje de éxito al usuario
      console.log(`Producto ${producto.nombre_producto} agregado al carrito.`);
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      // Manejar el error apropiadamente, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <div className="container-producto">
      <div className="tarjeta-producto">
        <h3>{producto.nombre_producto}</h3>
        <Link to={`/detalle-producto/${producto.cod_producto}`}>
          <img
            src={imageUrl}
            alt={producto.nombre_producto}
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        </Link>
        <p>Precio: {producto.precio_producto}</p>
        <button onClick={addToCart}>Añadir al carrito</button>
      </div>
    </div>
  );
};

export default ProductoCard;

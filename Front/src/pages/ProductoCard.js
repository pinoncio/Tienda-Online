import React from 'react';
import { Link } from 'react-router-dom';
import { createCarrito } from '../services/carrito';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../styles/catalogo.css';

const SERVER_BASE_URL = 'http://localhost:3000/';

const ProductoCard = ({ producto }) => {
  const imageUrl = new URL(producto.imagen, SERVER_BASE_URL).href;

  const addToCart = async () => {
    try {
      const idUsuario = localStorage.getItem('idUser');

      const carrito = {
        id_usuario: idUsuario,
        cantidad: 1,
        cod_producto: producto.cod_producto,
      };

      await createCarrito(carrito);

      // mensaje de producto agregado al carrito
      toast.success(`Producto ${producto.nombre_producto} agregado al carrito`, {
        position: "top-center",
        autoClose: 2000, 
        hideProgressBar: false,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      toast.error('Error al agregar el producto al carrito');
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
      <ToastContainer />
    </div>
  );
};

export default ProductoCard;



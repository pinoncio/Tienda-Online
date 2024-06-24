import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducto } from '../services/producto';
import { createCarrito } from '../services/carrito';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/detalleProducto.css';

const SERVER_BASE_URL = 'http://localhost:3000/';

const DetalleProduct = () => {
  const { cod_producto } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await getProducto(cod_producto);
        setProducto(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProducto();
  }, [cod_producto]);

  const addToCart = async () => {
    try {
      const idUsuario = localStorage.getItem('idUser');
      if (!idUsuario) {
        throw new Error('ID de usuario no encontrado en el almacenamiento local.');
      }

      const carrito = {
        id_usuario: idUsuario,
        cantidad: cantidad, // Enviar la cantidad seleccionada
        cod_producto: producto.cod_producto,
      };

      console.log(`${producto.nombre_producto} agregado al carrito`);
      console.log('Carrito:', carrito);
      await createCarrito(carrito);
      
      toast.success(`Producto ${producto.nombre_producto} agregado al carrito`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      toast.error('Error al agregar el producto al carrito', {
        closeButton: false,
      });
    }
  };

  if (loading) {
    return <div>Cargando producto...</div>;
  }

  if (!producto) {
    return <div>No se encontró el producto.</div>;
  }

  const imageUrl = new URL(producto.imagen, SERVER_BASE_URL).href;

  return (
    <div className="detalle-producto">
      <ToastContainer />
      <div className='imagen'>
        <img src={imageUrl} alt={producto.nombre_producto} />
      </div>
      <div className='body'> 
        <h2>{producto.nombre_producto}</h2>
        <p className='precio'>Precio: {producto.precio_producto}</p>
        <p className='descripcion'>Descripción: {producto.descripcion_producto}</p>
        <div>
          <label>Cantidad: </label>
          <input 
            type="number" 
            value={cantidad} 
            onChange={(e) => setCantidad(parseInt(e.target.value) || 1)} 
            min="1" 
          />
        </div>
        <button onClick={addToCart}>Añadir al carrito</button>
      </div>
    </div>
  );
};

export { DetalleProduct };

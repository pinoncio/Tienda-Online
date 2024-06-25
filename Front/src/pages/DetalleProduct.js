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
  const [stockDisponible, setStockDisponible] = useState(0); // Estado para el stock disponible

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await getProducto(cod_producto);
        setProducto(response.data);
        setStockDisponible(response.data.cantidad_disponible); // Establecer el stock disponible
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

      if (cantidad <= 0 || cantidad > stockDisponible) {
        throw new Error('Cantidad inválida. Por favor, selecciona una cantidad válida.');
      }

      const carrito = {
        id_usuario: idUsuario,
        cantidad: cantidad, // Enviar la cantidad seleccionada
        cod_producto: producto.cod_producto,
      };

      // Aquí envías la solicitud para agregar al carrito
      await createCarrito(carrito);

      // Actualizar el stock disponible restando la cantidad seleccionada
      setStockDisponible(stockDisponible - cantidad);

      // Notificar al usuario
      toast.success(`Producto ${producto.nombre_producto} agregado al carrito`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Reiniciar la cantidad a 1 después de agregar al carrito
      setCantidad(1);

    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      toast.error(error.message || 'Error al agregar el producto al carrito', {
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
            onChange={(e) => {
              const newValue = parseInt(e.target.value) || 1;
              setCantidad(Math.min(newValue, stockDisponible));
            }} 
            min="1" 
            max={stockDisponible} // Establecer el máximo permitido
          />
          <p>Stock disponible: {stockDisponible}</p> {/* Mostrar el stock disponible */}
        </div>
        <button onClick={addToCart}>Añadir al carrito</button>
      </div>
    </div>
  );
};

export { DetalleProduct };

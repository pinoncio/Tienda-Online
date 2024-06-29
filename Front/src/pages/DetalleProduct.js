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
  const [cantidad, setCantidad] = useState(1); 
  const [stockDisponible, setStockDisponible] = useState(0);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await getProducto(cod_producto);
        setProducto(response.data);
        setStockDisponible(response.data.cantidad_disponible);
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

      if (cantidad <= 0 || cantidad > stockDisponible) {
        throw new Error('Cantidad inválida. Por favor, selecciona una cantidad válida.');
      }

      if (idUsuario) {
        const carrito = {
          id_usuario: idUsuario,
          cantidad: cantidad,
          cod_producto: producto.cod_producto,
        };

        await createCarrito(carrito);

        setStockDisponible(stockDisponible - cantidad);

        toast.success(`Producto ${producto.nombre_producto} agregado al carrito`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        setCantidad(1);
      } else {
        let carritoLocal = JSON.parse(localStorage.getItem('carritoLocal')) || [];
        const productoEnCarrito = carritoLocal.find(item => item.cod_producto === producto.cod_producto);

        if (productoEnCarrito) {
          productoEnCarrito.cantidad += cantidad;
          productoEnCarrito.subtotal += producto.precio_producto * cantidad;
        } else {
          carritoLocal.push({
            id_carro_productos: new Date().getTime(), // ID temporal
            producto: {
              nombre_producto: producto.nombre_producto,
              precio_producto: producto.precio_producto
            },
            cantidad: cantidad,
            subtotal: producto.precio_producto * cantidad,
            cod_producto: producto.cod_producto
          });
        }

        localStorage.setItem('carritoLocal', JSON.stringify(carritoLocal));
        setStockDisponible(stockDisponible - cantidad);

        toast.success(`Producto ${producto.nombre_producto} agregado al carrito`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setCantidad(1);
      }

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
      <div className='detalles'>
        <h2>{producto.nombre_producto}</h2>
        <p>{producto.descripcion_producto}</p>
        <p>Precio: ${producto.precio_producto}</p>
        <p>Disponibles: {stockDisponible}</p>
        <label>
          Cantidad:
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            min="1"
            max={stockDisponible}
          />
        </label>
        <button onClick={addToCart}>Agregar al Carrito</button>
      </div>
    </div>
  );
};

export { DetalleProduct };

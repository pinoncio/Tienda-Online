import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducto } from '../services/producto';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/detalleProducto.css';

const SERVER_BASE_URL = 'http://localhost:3000/';

const DetalleProduct = () => {
  const { cod_producto } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad, inicializado en 1
  const [carrito, setCarrito] = useState([]); // Estado para el carrito de compras

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

  const addToCart = () => {
    try {
      const idUsuario = localStorage.getItem('idUser');
      if (!idUsuario) {
        throw new Error('ID de usuario no encontrado en el almacenamiento local.');
      }

      // Verificar si el producto ya está en el carrito
      const existingItem = carrito.find(item => item.cod_producto === producto.cod_producto);

      if (existingItem) {
        // Si el producto ya está en el carrito, actualizamos la cantidad sumando la nueva cantidad
        const updatedCarrito = carrito.map(item =>
          item.cod_producto === producto.cod_producto
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
        setCarrito(updatedCarrito);
      } else {
        // Si el producto no está en el carrito, lo agregamos con la cantidad seleccionada
        const newItem = {
          cod_producto: producto.cod_producto,
          nombre_producto: producto.nombre_producto,
          cantidad: cantidad
        };
        setCarrito([...carrito, newItem]);
      }

      // Mensaje de producto agregado al carrito
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
        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(parseInt(e.target.value))}
        />
        <button onClick={addToCart}>Añadir al carrito</button>
      </div>

      {/* Mostrar el carrito de compras */}
      <div className="carrito-container">
        <h3>Carrito de Compras</h3>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map(item => (
              <tr key={item.cod_producto}>
                <td>{item.nombre_producto}</td>
                <td>{item.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { DetalleProduct };

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCarritosProductos, deleteCarritoProducto, updateCarritoProducto } from '../services/carritoproducto';
import { createTransaction } from '../services/pago'; 
import '../styles/Carrito.css';

const Carrito = () => {
  const [carritosProductos, setCarritosProductos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editCantidad, setEditCantidad] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarritosProductos();
  }, []);

  const fetchCarritosProductos = async () => {
    try {
      const idUser = localStorage.getItem('idUser');
      if (idUser) {
        const response = await getCarritosProductos(idUser);
        setCarritosProductos(response.data);
      } else {
        const carritoLocal = JSON.parse(localStorage.getItem('carritoLocal')) || [];
        setCarritosProductos(carritoLocal);
      }
    } catch (error) {
      console.error('Error fetching carritos de productos:', error);
    }
  };

  const calculateTotal = () => {
    return carritosProductos.reduce((total, item) => total + item.subtotal, 0);
  };

  const handleContinueShopping = () => {
    navigate('/catalogo');
  };

  const handleDeleteProducto = async (idCarroProducto) => {
    try {
      const idUser = localStorage.getItem('idUser');
      if (idUser) {
        await deleteCarritoProducto(idCarroProducto);
        fetchCarritosProductos(); // Actualizar la lista de productos después de eliminar
      } else {
        const carritoLocal = carritosProductos.filter(item => item.id_carro_productos !== idCarroProducto);
        localStorage.setItem('carritoLocal', JSON.stringify(carritoLocal));
        setCarritosProductos(carritoLocal);
      }

    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const handleEditProducto = (index, cantidad) => {
    setEditIndex(index);
    setEditCantidad(cantidad);
  };

  const handleUpdateProducto = async (carritoProducto) => {
    try {
      const idUser = localStorage.getItem('idUser');
      if (idUser) {
        await updateCarritoProducto(carritoProducto.id_carro_productos, {
          ...carritoProducto,
          cantidad: editCantidad,
          subtotal: carritoProducto.producto.precio_producto * editCantidad,
        });
        setEditIndex(null);
        fetchCarritosProductos(); // Actualizar la lista de productos después de actualizar
      } else {
        const carritoLocal = carritosProductos.map(item =>
          item.id_carro_productos === carritoProducto.id_carro_productos
            ? { ...item, cantidad: editCantidad, subtotal: item.producto.precio_producto * editCantidad }
            : item
        );
        localStorage.setItem('carritoLocal', JSON.stringify(carritoLocal));
        setCarritosProductos(carritoLocal);
        setEditIndex(null);
      }
    } catch (error) {
      console.error('Error al actualizar el producto del carrito:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const idUser = localStorage.getItem('idUser');
      const amount = calculateTotal();
      const sessionId = idUser; 
      const buyOrder = 'orden' + new Date().getTime(); 
      const returnUrl = 'http://localhost:3000/api/webpay_plus/commit'; 
  
      const { url, token_ws } = await createTransaction(amount, sessionId, buyOrder, returnUrl);
  
      window.location.href = `${url}?token_ws=${token_ws}`;
    } catch (error) {
      console.error('Error al crear la transacción', error);
    }
  };
  

  return (
    <div className="carrito-container">
      <h2>Resumen de mi Pedido</h2>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {carritosProductos.map((carritoProducto, index) => (
            <tr key={carritoProducto.id_carro_productos}>
              <td>{carritoProducto.producto.nombre_producto}</td>
              <td>
                {editIndex === index ? (
                  <input
                    type="number"
                    value={editCantidad}
                    onChange={(e) => setEditCantidad(Number(e.target.value))}
                    min="1"
                  />
                ) : (
                  carritoProducto.cantidad
                )}
              </td>
              <td>${carritoProducto.subtotal}</td>
              <td>
                {editIndex === index ? (
                  <button onClick={() => handleUpdateProducto(carritoProducto)}>Guardar</button>
                ) : (
                  <button onClick={() => handleEditProducto(index, carritoProducto.cantidad)}>Editar</button>
                )}
                <button className="delete-button" onClick={() => handleDeleteProducto(carritoProducto.id_carro_productos)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total">
        <span>Total a Pagar: ${calculateTotal()}</span>
      </div>
      <div className="buttons">
        <button className="continue-shopping" onClick={handleContinueShopping}>Continuar Comprando</button>
        <button className="place-order" onClick={handlePlaceOrder}>Solicitar Pedido</button>
      </div>
    </div>
  );
};

export { Carrito };

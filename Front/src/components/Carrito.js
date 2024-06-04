import React, { useState, useEffect } from 'react';
import { getCarritosProductos } from '../services/carritoproducto'; 
import '../styles/Carrito.css';

const Carrito = () => {
  const [carritosProductos, setCarritosProductos] = useState([]);

  useEffect(() => {
    fetchCarritosProductos(); 
  }, []);

  const fetchCarritosProductos = async () => {
    try {
      const response = await getCarritosProductos();
      setCarritosProductos(response.data); 
    } catch (error) {
      console.error('Error fetching carritos de productos:', error);
    }
  };

  const calculateTotal = () => {
    return carritosProductos.reduce((total, item) => total + item.subtotal, 0);
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
          {carritosProductos.map((carritoProducto) => (
            <tr key={carritoProducto.id_carro_productos}>
              <td>{carritoProducto.producto.nombre_producto}</td>
              <td>
                <button>-</button>
                {carritoProducto.cantidad}
                <button>+</button>
              </td>
              <td>${carritoProducto.subtotal}</td>
              <td>
                <button className="delete-button">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total">
        <span>Total a Pagar: ${calculateTotal()}</span>
      </div>
      <div className="buttons">
        <button className="continue-shopping">Continuar Comprando</button>
        <button className="place-order">Solicitar Pedido</button>
      </div>
    </div>
  );
};

export default Carrito;

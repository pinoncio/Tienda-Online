import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCarritosProductos, deleteCarritoProducto, updateCarritoProducto } from '../services/carritoproducto';
import '../styles/Carrito.css';

const Carrito = () => {
  const [carritosProductos, setCarritosProductos] = useState([]);
  const [cantidadModificada, setCantidadModificada] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarritosProductos();
  }, []);

  const fetchCarritosProductos = async () => {
    try {
      const idUser = localStorage.getItem('idUser');
      const response = await getCarritosProductos(idUser);
      setCarritosProductos(response.data);
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
      await deleteCarritoProducto(idCarroProducto);
      fetchCarritosProductos();
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const handleModificarCantidad = (idCarroProducto) => {
    const productoAModificar = carritosProductos.find(producto => producto.id_carro_productos === idCarroProducto);
    setCantidadModificada({ ...cantidadModificada, [idCarroProducto]: productoAModificar.cantidad });
  };

  const handleConfirmUpdateCantidad = async (idCarroProducto) => {
    try {
      await updateCarritoProducto(idCarroProducto, { cantidad: cantidadModificada[idCarroProducto] });
      fetchCarritosProductos();
      setCantidadModificada({ ...cantidadModificada, [idCarroProducto]: undefined });
    } catch (error) {
      console.error('Error al actualizar la cantidad del producto:', error);
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carritosProductos.map((carritoProducto) => (
            <tr key={carritoProducto.id_carro_productos}>
              <td>{carritoProducto.producto.nombre_producto}</td>
              <td>
                {cantidadModificada[carritoProducto.id_carro_productos] !== undefined ? (
                  <input
                    type="number"
                    value={cantidadModificada[carritoProducto.id_carro_productos]}
                    onChange={(e) => setCantidadModificada({ ...cantidadModificada, [carritoProducto.id_carro_productos]: parseInt(e.target.value) })}
                  />
                ) : (
                  carritoProducto.cantidad
                )}
              </td>
              <td>${carritoProducto.subtotal}</td>
              <td>
                {cantidadModificada[carritoProducto.id_carro_productos] !== undefined ? (
                  <button className="update-button" onClick={() => handleConfirmUpdateCantidad(carritoProducto.id_carro_productos)}>Confirmar</button>
                ) : (
                  <button className="modify-button" onClick={() => handleModificarCantidad(carritoProducto.id_carro_productos)}>Modificar</button>
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
        <button className="place-order">Solicitar Pedido</button>
      </div>
    </div>
  );
};

export { Carrito };

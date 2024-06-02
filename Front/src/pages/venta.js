import React, { useState, useEffect } from 'react';
import { getVentas } from '../services/ventas';
import '../styles/venta.css';

const Venta = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    // Carga la lista de ventas cuando el componente se monta
    loadVentas();
  }, []);

  const loadVentas = async () => {
    try {
      const response = await getVentas();
      setVentas(response.data);
    } catch (error) {
      console.error('Error fetching ventas:', error);
    }
  };

  return (
    <div className="container">
      <h1>Lista de Ventas</h1>
      <table>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>ID Usuario</th>
            <th>Fecha Venta</th>
            <th>Subtotal</th>
            <th>Impuestos</th>
            <th>Descuentos</th>
            <th>Total</th>
            <th>Método de Pago</th>
            <th>Estado de la Venta</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id_venta}>
              <td>{venta.id_venta}</td>
              <td>{venta.id_usuario}</td>
              <td>{venta.fecha_venta}</td>
              <td>{venta.subtotal}</td>
              <td>{venta.impuestos}</td>
              <td>{venta.descuentos}</td>
              <td>{venta.total}</td>
              <td>{venta.metodo_de_pago}</td>
              <td>{venta.estado_de_la_venta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Venta;


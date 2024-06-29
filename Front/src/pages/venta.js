import React, { useEffect, useState } from 'react';
import { getVentasByUserId } from '../services/ventas';
import '../styles/vent.css';

const VentaId = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      const idUser = localStorage.getItem('idUser');
      if (!idUser) {
        console.error('ID de usuario no encontrado en localStorage');
        return;
      }

      try {
        const ventasData = await getVentasByUserId(idUser);
        setVentas(ventasData);
      } catch (error) {
        console.error('Error al cargar las ventas del usuario:', error);
      }
    };

    fetchVentas();
  }, []);

  return (
    <div className="venta-container">
      <h2>Mis Ventas</h2>
      {ventas.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID Venta</th>
              <th>Fecha</th>
              <th>Subtotal</th>
              <th>Impuestos</th>
              <th>Descuentos</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id_venta}>
                <td>{venta.id_venta}</td>
                <td>{venta.fecha_venta}</td>
                <td>{venta.subtotal}</td>
                <td>{venta.impuestos}</td>
                <td>{venta.descuentos}</td>
                <td>{venta.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay ventas registradas.</p>
      )}
    </div>
  );
};

export default VentaId;

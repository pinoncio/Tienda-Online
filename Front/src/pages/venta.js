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
              <th>Numero Venta</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Visualizar</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id_venta}>
                <td>{venta.id_venta}</td>
                <td>{venta.fecha_venta}</td>
                <td>{venta.total}</td>
                <td>Total</td>
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

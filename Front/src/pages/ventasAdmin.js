import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVentas } from '../services/ventas';
import '../styles/venta.css';

const VentaAdmin = () => {
  const [ventas, setVentas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVentas = async () => {

      try {
        const ventasData = await getVentas();
        setVentas(ventasData);
      } catch (error) {
        console.error('Error al cargar las ventas:', error);
      }
    };

    fetchVentas();
  }, []);

  const handleVerDetalle = (idVenta) => {
    navigate(`/detalleVenta/${idVenta}`);
  };

  return (
    <div className="ventaAdmin-container">
      <h2>Mis Ventas</h2>
      {ventas.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Número Venta</th>
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
                <td>
                  <button onClick={() => handleVerDetalle(venta.id_venta)}>
                    👁️
                  </button>
                </td>
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

export default VentaAdmin;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVentas } from '../services/ventas';
import '../styles/venta.css';

const VentaAdmin = () => {
  const [ventas, setVentas] = useState([]);
  const [filteredVentas, setFilteredVentas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const ventasData = await getVentas();
        setVentas(ventasData);
        setFilteredVentas(ventasData);
      } catch (error) {
        console.error('Error al cargar las ventas:', error);
      }
    };

    fetchVentas();
  }, []);

  useEffect(() => {
    const filtered = ventas.filter(venta => 
      venta.id_venta.toString().startsWith(searchTerm)
    );
    setFilteredVentas(filtered);
  }, [searchTerm, ventas]);

  const handleVerDetalle = (idVenta) => {
    navigate(`/detalleVenta/${idVenta}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    const sorted = [...filteredVentas].sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.fecha_venta) - new Date(b.fecha_venta);
      } else {
        return new Date(b.fecha_venta) - new Date(a.fecha_venta);
      }
    });
    setFilteredVentas(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="ventaAdmin-container">
      <h2>Ventas</h2>
      <div className="search-sort">
        <input
          type="text"
          placeholder="Buscar por ID de venta"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleSort}>
          Ordenar por fecha {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      {filteredVentas.length > 0 ? (
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
            {filteredVentas.map((venta) => (
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
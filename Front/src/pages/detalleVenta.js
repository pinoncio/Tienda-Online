import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVentasProductoByIdVenta } from '../services/venta_producto';
import { getVentaById } from '../services/ventas';
import '../styles/boleta.css';

const DetalleVenta = () => {
  const { idVenta } = useParams();
  const [detalleVenta, setDetalleVenta] = useState(null);

  useEffect(() => {
    const fetchDetalleVenta = async () => {
      try {
        // Obtener los productos de la venta
        const productosData = await getVentasProductoByIdVenta(idVenta);
        console.log("Productos Data:", productosData);

        // Obtener los detalles generales de la venta
        const ventaData = await getVentaById(idVenta);
        console.log("Venta Data:", ventaData);

        // Combinar los datos de productos con los detalles de la venta
        const detalleData = {
          ...ventaData,
          productos: productosData
        };

        console.log("Detalle Data:", detalleData);

        setDetalleVenta(detalleData);
      } catch (error) {
        console.error('Error al obtener detalles de la venta:', error);
      }
    };

    fetchDetalleVenta();
  }, [idVenta]);

  if (!detalleVenta) {
    return <p>Cargando detalle de la venta...</p>;
  }

  return (
    <div className="detalle-venta">
      <h3>Boleta de Venta</h3>
      <div className="boleta">
        <div className="boleta-info">
          <p><strong>ID Venta:</strong> {detalleVenta.id_venta}</p>
          <p><strong>Usuario:</strong> {detalleVenta.id_usuario}</p>
          <p><strong>Fecha:</strong> {detalleVenta.fecha_venta}</p>
          <p><strong>Subtotal:</strong> ${detalleVenta.subtotal}</p>
          <p><strong>Impuestos:</strong> ${detalleVenta.impuestos}</p>
          <p><strong>Descuentos:</strong> ${detalleVenta.descuentos}</p>
          <p><strong>Total:</strong> ${detalleVenta.total}</p>
          <p><strong>Estado de la Venta:</strong> {detalleVenta.estado_de_la_venta ? 'Completada' : 'Pendiente'}</p>
        </div>
        <h4>Productos</h4>
        {detalleVenta.productos && detalleVenta.productos.length > 0 ? (
          <table className="productos">
            <thead>
              <tr>
                <th>ID Venta Producto</th>
                <th>Código Producto</th>
                <th>Cantidad</th>
                <th>Subtotal Producto</th>
              </tr>
            </thead>
            <tbody>
              {detalleVenta.productos.map((producto) => (
                <tr key={producto.id_ventas_productos}>
                  <td>{producto.id_ventas_productos}</td>
                  <td>{producto.cod_producto}</td>
                  <td>{producto.cantidad}</td>
                  <td>${producto.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay productos en esta venta.</p>
        )}
      </div>
    </div>
  );
};

export default DetalleVenta;

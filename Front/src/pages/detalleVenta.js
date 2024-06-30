import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVentasProductoByIdVenta } from '../services/venta_producto';
import { getVentaById } from '../services/ventas';
import { getUser } from '../services/user';
import { getProducto } from '../services/producto';
import '../styles/boleta.css';

const DetalleVenta = () => {
  const { idVenta } = useParams();
  const [ventaData, setVentaData] = useState(null);
  const [productosData, setProductosData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [productosDetalle, setProductosDetalle] = useState([]);

  useEffect(() => {
    const fetchDetalleVenta = async () => {
      try {
        const productos = await getVentasProductoByIdVenta(idVenta);
        setProductosData(productos);

        const venta = await getVentaById(idVenta);
        setVentaData(venta);

        const user = await getUser(venta.id_usuario);
        setUserData(user.data);

        const detallesPromises = productos.map(async (producto) => {
          const detalleProducto = await getProducto(producto.cod_producto);
          return detalleProducto.data;
        });

        const detallesProductos = await Promise.all(detallesPromises);
        setProductosDetalle(detallesProductos);

      } catch (error) {
        console.error('Error al obtener detalles de la venta:', error);
      }
    };

    fetchDetalleVenta();
  }, [idVenta]);

  if (!ventaData || !productosData || !userData || productosDetalle.length !== productosData.length) {
    return <p>Cargando detalle de la venta...</p>;
  }

  return (
    <div className="detalle-venta">

      <div className="boleta">
        <h2>Detalle Compra</h2>
        <div className="boleta-info">
          <p><strong>Boleta:</strong> {ventaData.id_venta}</p>
          <p><strong>Fecha:</strong> {ventaData.fecha_venta}</p>
          <p><strong>RUT:</strong> {userData.rut_usuario}</p>
          <p><strong>Nombre:</strong> {userData.nombre_usuario}</p>
          <p><strong>Apellido Paterno:</strong> {userData.apellido1_usuario}</p>
          <p><strong>Apellido Materno:</strong> {userData.apellido2_usuario}</p>
          <p><strong>Dirección:</strong> {userData.direccion}</p>
          <p><strong>Estado de la Venta:</strong> {ventaData.estado_de_la_venta ? 'Completada' : 'Pendiente'}</p>
        </div>
        {productosDetalle && productosDetalle.length > 0 ? (
          <table className="productos">
            <thead>
              <tr>
                <th>Código Producto</th>
                <th>Nombre Producto</th>
                <th>Cantidad</th>
                <th>Subtotal Producto</th>
              </tr>
            </thead>
            <tbody>
              {productosDetalle.map((detalle, index) => (
                <tr key={productosData[index].id_ventas_productos}>
                  <td>{productosData[index].cod_producto}</td>
                  <td>{detalle.nombre_producto}</td>
                  <td>{productosData[index].cantidad}</td>
                  <td>${productosData[index].subtotal}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" style={{ textAlign: 'right' }}><strong>Impuesto:</strong></td>
                <td>${ventaData.impuestos}</td>
              </tr>
              <tr>
                <td colSpan="3" style={{ textAlign: 'right' }}><strong>Total:</strong></td>
                <td>${ventaData.total}</td>
              </tr>
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

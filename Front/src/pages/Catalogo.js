import React, { useState, useEffect } from 'react';
import { getProductos } from '../services/producto';
import ProductoCard from './ProductoCard';
import '../styles/catalogo.css';


const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // aqui se carga la lista de productos
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const response = await getProductos();
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching productos:', error);
    }
  };

  return (
    <div className="container">
      <h1>Catálogo de Productos</h1>
      <div className="product-grid">
        {productos.map((producto) => (
          <ProductoCard key={producto.cod_producto} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export {Catalogo};

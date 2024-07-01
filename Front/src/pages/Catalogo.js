import React, { useState, useEffect } from 'react';
import { getProductos } from '../services/producto';
import ProductoCard from './ProductoCard';
import '../styles/catalogo.css';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');  // Estado para el término de búsqueda
  const [sortOption, setSortOption] = useState('Sin filtro');  // Estado para la opción de filtrado

  useEffect(() => {
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

  // Función para manejar el cambio del término de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Función para manejar el cambio de la opción de filtrado
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filtrar y ordenar productos
  const filteredProducts = productos
  .filter(producto =>
    producto.nombre_producto.toLowerCase().startsWith(searchTerm.toLowerCase())
  )
    .sort((a, b) => {
      if (sortOption === 'menorPrecio') {
        return a.precio_producto - b.precio_producto;
      } else if (sortOption === 'mayorPrecio') {
        return b.precio_producto - a.precio_producto;
      }
      return 0;
    });

  return (
    <div className="container">
      <h1>Catálogo de Productos</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={sortOption} onChange={handleSortChange}>
          <option value="Sin filtro"> - </option>
          <option value="menorPrecio">Menor Precio</option>
          <option value="mayorPrecio">Mayor Precio</option>
        </select>
      </div>
      <div className="contenedor-product">
        {filteredProducts.map((producto) => (
          <ProductoCard key={producto.cod_producto} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export { Catalogo };
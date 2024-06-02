import React from 'react';
import { useParams } from 'react-router-dom';
import product1 from '../image/1.jpeg';
import product2 from '../image/2.jpeg';
import product3 from '../image/3.jpeg';
import '../styles/detalleProducto.css';

const products = {
  1: { id: 1, name: 'Mural Rame', description: 'descripcion', price: '$80.000', image: product1 },
  2: { id: 2, name: 'Mural Mostasa', description: 'descripcion', price: '$precio', image: product2 },
  3: { id: 3, name: 'Mural Angel', description: 'descripcion', price: '$precio', image: product3 },
};

function DetalleProducto() {
  const { id } = useParams();
  const product = products[id];

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p className="precio">{product.price}</p>
    </div>
  );
}

export { DetalleProducto };

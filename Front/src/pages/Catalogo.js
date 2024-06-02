import React from 'react';
import { useNavigate } from 'react-router-dom';
import product1 from '../image/1.jpeg';
import product2 from '../image/2.jpeg';
import product3 from '../image/3.jpeg';
import '../styles/catalogo.css';

function Catalogo() {
  const navigate = useNavigate();

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section id="catalogo">
      <h1>Catalogo de productos</h1>
      <div className="catalog">
        <div className="product">
          <h2>Mural Rame</h2>
          <img src={product1} alt="Mural Rame" onClick={() => handleImageClick(1)} />
          <p>descripcion</p>
        </div>

        <div className="product">
          <h2>Mural Mostasa</h2>
          <img src={product2} alt="Mural Mostasa" onClick={() => handleImageClick(2)} />
          <p>descripcion</p>
        </div>

        <div className="product">
          <h2>Mural Angel</h2>
          <img src={product3} alt="Mural Angel" onClick={() => handleImageClick(3)} />
          <p>descripcion</p>
        </div>
      </div>
    </section>
  );
}

export { Catalogo };

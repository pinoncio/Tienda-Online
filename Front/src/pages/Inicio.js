import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo1.png';
import product1 from '../image/1.jpeg';
import product2 from '../image/2.jpeg';
import product3 from '../image/3.jpeg';
import '../styles/inicio.css';

function Inicio() {
  const navigate = useNavigate();

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  
  return (
    <main>
      <section id="inicio">
        <h2>Bienvenidos a Creaciones con Amor</h2>
        <p>
        Descubre la magia del macramé en cada uno de nuestros productos confeccionados a mano. 
        ¡Explora y encuentra el toque especial para tu hogar!
        </p>
        <ScrollLink to="sobre-nosotros" smooth={true} duration={1000}>
          <button>Más información</button>
        </ScrollLink>
      </section>

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

      <section id="sobre-nosotros">
        <h2 className="titulo-sobre-nosotros">Sobre nosotros</h2>
        <div className="about-us-container">
          <img src={logo} alt="Imagen de nosotros" />
          <div className="about-us-text">
          <p>
              En Creaciones con Amor, nos dedicamos a ofrecer productos únicos y de alta calidad hechos con el mayor cuidado y dedicación. Nuestra misión es brindarte una experiencia de compra excepcional y productos que encanten.
            </p>
            <p>
              Fundamos Creaciones con Amor en el año 2023. 
              Te invitamos a conocer nuestra visión, misión y valores de nuestro emprendimiento.
              Esta información está archivada con mucho amor y dedicación,ya que es parte de nuestra historia
            </p>
            <p>
              Misión: proporcionar un servicio de calidad a los clientes en la eloaboración de productos hechos a mano en Macrame.
            </p>
            <p>
              Visión: convertirme en una reconocida emprendedora en creaciones con la tecnica del Macrame.
               Confiable y recomendada gracias a la satisfacción del cliente y el amor y la dedicación que le dedico a cada creación.
            </p>
            <p>
              Valores: respeto, honestidad y transparencia, profesionalismo y responsabilidad, servicio personalizado en el que cada cliente 
              se sienta comodo y satisfecho de pedir y recibir su producto.
            </p>          
          </div>
        </div>
      </section>
    </main>
  );
}

export { Inicio };

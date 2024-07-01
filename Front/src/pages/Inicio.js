import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { top3Ventas } from '../services/venta_producto';
import logo from '../image/logo1.png';
import ProductoCard from './ProductoCard';
import '../styles/inicio.css';

function Inicio() {
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);

  useEffect(() => {
    const fetchProductosMasVendidos = async () => {
      try {
        const productos = await top3Ventas();
        setProductosMasVendidos(productos);
      } catch (error) {
        console.error('Error al obtener los productos mas vendidos:', error);
      }
    };

    fetchProductosMasVendidos();
  }, []);

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
        <h1>Productos más vendidos</h1>
        <div className="catalog">
          {productosMasVendidos.map((producto) => (
            <ProductoCard key={producto.cod_producto} producto={producto} />
          ))}
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
              Esta información está archivada con mucho amor y dedicación, ya que es parte de nuestra historia.
            </p>
            <p>
              Misión: proporcionar un servicio de calidad a los clientes en la elaboración de productos hechos a mano en Macramé.
            </p>
            <p>
              Visión: convertirme en una reconocida emprendedora en creaciones con la técnica del Macramé.
              Confiable y recomendada gracias a la satisfacción del cliente y el amor y la dedicación que le dedico a cada creación.
            </p>
            <p>
              Valores: respeto, honestidad y transparencia, profesionalismo y responsabilidad, servicio personalizado en el que cada cliente se sienta cómodo y satisfecho de pedir y recibir su producto.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export { Inicio };

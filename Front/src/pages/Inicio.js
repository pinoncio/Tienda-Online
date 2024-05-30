import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../image/logo1.png';
import product1 from '../image/1.jpeg';
import product2 from '../image/2.jpeg';
import product3 from '../image/3.jpeg';
import '../styles/inicio.css';

function Inicio() {
  return (
    <main>
      <section id="inicio">
        <h2>Bienvenidos a Creaciones con Amor</h2>
        <p>
          Desde el año 2017 ofrecemos una experiencia única de compra en nuestra tienda local.
          Hacemos las cosas un poco diferente en Creaciones con Amor por lo que te invitamos a
          visitarnos y conocer nuestra amplia y grandiosa selección.
        </p>
        <ScrollLink to="sobre-nosotros" smooth={true} duration={1000}>
          <button>Más información</button>
        </ScrollLink>
      </section>

      <section id="catalogo">
        <h2>Productos Destacados</h2>
        <div className="catalog">
          <div className="product">
            <h2>Mural Rame</h2>
            <p>Poco uso</p>
            <img src={product1} alt="Mural Rame" />
          </div>

          <div className="product">
            <h2>Producto 2</h2>
            <p>Descripción breve del producto 2.</p>
            <img src={product2} alt="Producto 2" />
          </div>

          <div className="product">
            <h2>Producto 3</h2>
            <p>Descripción breve del producto 3.</p>
            <img src={product3} alt="Producto 3" />
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
              Fundamos Creaciones con Amor en el año 2017, con una misión: ser una tienda de artículos de productos para cumpleaños y papelería de alta calidad en Ciudad de Canelones. Nuestra pasión por la excelencia nos condujo a materializar esta misión, siendo ésta la parte fundamental que nos ha impulsado a seguir adelante.
            </p>
            <p>
              Nos enorgullecemos de ofrecer una experiencia de compra superior y de las relaciones a largo plazo que hemos construido con nuestros clientes. Visítanos hoy mismo y descubre por qué somos la mejor opción para tus necesidades de cumpleaños y papelería.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export { Inicio };

import React from 'react';
import product1 from '../image/1.jpeg';
import product2 from '../image/2.jpeg';
import product3 from '../image/3.jpeg';

function Inicio(){
    return (
      <main>
        <section id="inicio">
          <h2>Bienvenidos a Creaciones con Amor</h2>
          <p>Desde el año 2017 ofrecemos una experiencia única de compra en nuestra tienda local. Hacemos las cosas un poco diferente en Creaciones con Amor por lo que te invitamos a visitarnos y conocer nuestra amplia y grandiosa selección.</p>
          <button>Más información</button>
        </section>
        <section id="catalogo">
          <h2>Productos Destacados</h2>
          <div className="catalog">
           
            <div className="product">
              <h2>Mural Rame</h2>
              <p>poco uso</p>
              <img src={product1} alt="" />
            </div>

            <div className="product">
              <h2>Producto 2</h2>
              <p>Descripción breve del producto 2.</p>
              <img src={product2} alt="" />  
            </div>

            <div className="product">
              <h2>Producto 3</h2>
              <p>Descripción breve del producto 3.</p>
              <img src={product3} alt="" />   
            </div>
            
          </div>
        </section>
      </main>
    );
  }


export {Inicio};
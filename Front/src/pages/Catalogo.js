import React from 'react';
import product1 from '../image/1.jpeg';
import product2 from '../image/2.jpeg';
import product3 from '../image/3.jpeg';

function Catalogo(){
    return <>
        
        <section id="catalogo">
          <h1>Catalogo de productos</h1>
          <div className="catalog">
            <div className="product">
              <h2>Mural Rame</h2>
              <img src={product1} alt="" />
              <p>descripcion</p>
              <p className="precio">$80.000</p> 
              <button className="add-carrito">Agregar al carrito</button>
            </div>

            <div className="product">
              <h2>Mural Mostasa</h2>
              <img src={product2} alt="" /> 
              <p>descripcion</p> 
              <p className="precio">$precio</p>
              <button className="add-carrito">Agregar al carrito</button>
            </div>

            <div className="product">
              <h2>Mural Angel</h2>
              <img src={product3} alt="" />   
              <p>descripcion</p>
              <p className="precio">$precio</p>
              <button className="add-carrito">Agregar al carrito</button>
            </div>       
            
          </div>
        </section>
    </>
}


export {Catalogo};
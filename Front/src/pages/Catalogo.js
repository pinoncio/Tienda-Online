import React from 'react';
import product1 from '../image/1.jpeg';
import product2 from '../image/2.jpeg';
import product3 from '../image/3.jpeg';

function Catalogo(){
    return <>
        
        <section id="catalogo">
          <div className="catalog">
           
            <div className="product">
              <h2>Mural Rame</h2>
              <p>poco uso</p>
              <img src={product1} alt="" />
              <p className="precio">$80.000</p> 
              <button className="add-carrito">Agregar al carrito</button>
            </div>

            <div className="product">
              <h2>Mural Mostasa</h2>
              <p>Descripción breve del producto 2.</p>
              <img src={product2} alt="" />  
              <p className="precio">$precio</p>
              <button className="add-carrito">Agregar al carrito</button>
            </div>

            <div className="product">
              <h2>Mural Angel</h2>
              <p>Descripción breve del producto 3.</p>
              <img src={product3} alt="" />   
              <p className="precio">$precio</p>
              <button className="add-carrito">Agregar al carrito</button>
            </div>

            <div className="product">
              <h2>Mural Hada</h2>
              <p>Descripción breve del producto 3.</p>
              <img src={product3} alt="" /> 
              <p className="precio">$precio</p> 
              <button className="add-carrito">Agregar al carrito</button>
            </div>

            <div className="product">
              <h2>Mural Ballena</h2>
              <p>Descripción breve del producto 3.</p>
              <img src={product3} alt="" />   
              <p className="precio">$precio</p>
              <button className="add-carrito">Agregar al carrito</button>
            </div>

            <div className="product">
              <h2>Árbol de la vida</h2>
              <p>Descripción breve del producto 3.</p>
              <img src={product3} alt="" />  
              <p className="precio">$precio</p> 
              <button className="add-carrito">Agregar al carrito</button>
            </div>
            

            <div className="product">
              <h2>Espejo</h2>
              <p>Descripción breve del producto 3.</p>
              <img src={product3} alt="" />  
              <p className="precio">$precio</p>
              <button className="add-carrito">Agregar al carrito</button> 
            </div>

            <div className="product">
              <h2>Individual</h2>
              <p>Descripción breve del producto 3.</p>
              <img src={product3} alt="" />   
              <p className="precio">$precio</p>
              <button className="add-carrito">Agregar al carrito</button>
            </div>

            <div className="product">
              <h2>Porta vaso</h2>
              <p>Descripción breve del producto 3.</p>
              <img src={product3} alt="" />   
              <p className="precio">$precio</p>
              <button className="add-carrito">Agregar al carrito</button>
            </div>

            <div className="product">
              <h2>Porta Maceta</h2>
              <p>Descripción breve del producto 3.</p>
              <img src={product3} alt="" />   
              <p className="precio">$precio</p>
              <button className="add-carrito">Agregar al carrito</button>
            </div>


        
            
          </div>
        </section>
    </>
}


export {Catalogo};
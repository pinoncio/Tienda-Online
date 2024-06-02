import React from 'react';
import { useParams , Link} from 'react-router-dom';
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

  const addCantCarrito = (event) => {
    const cantidad = event.target.parentNode.querySelector('input').value;
    console.log(`Agregado al carrito: ${product.name} - Cantidad: ${cantidad}`);
    // Aquí puedes agregar la lógica para agregar el producto al carrito con la cantidad seleccionada
  };

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="detalle-producto">
      <img src={product.image} alt={product.name} />
      <div className="detalle-body">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="precio">{product.price}</p>
        <div className="cantidad">
          <label htmlFor="quantity">Cantidad:</label>
          <input type="number" id="cantidad" name="cantidad" min="1" defaultValue="1" />
        </div>
        < button className="add-carrito" onClick={addCantCarrito}>Agregar al carrito</button>
        <div className="boton-volver">
            <Link to="/catalogo" >Volver al catálogo</Link>
        </div>
      </div>

    </div>
  );
}

export { DetalleProducto };
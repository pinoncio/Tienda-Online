// Fracaso.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/exito.css'

const Fracaso = () => {
  const navigate = useNavigate()
  const handleContinuar = async () => {
    navigate('/')
  }
  return (
    <div className="exito-container">
      <h2>Pago Fallido</h2>
      <p>Lo sentimos, no hemos podido procesar su pago en este momento.</p>
      <button onClick={handleContinuar}>Continuar</button>
      {/* Puedes ofrecer opciones adicionales o contactar soporte */}
    </div>
  );
};

export default Fracaso;

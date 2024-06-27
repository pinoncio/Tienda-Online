import React from 'react';
import { useNavigate } from 'react-router-dom';
import  {newVenta}  from '../services/exito';
import '../styles/exito.css';

const Exito = () => {
  const navigate = useNavigate();

  const handleContinuar = async () => {
    const idUser = localStorage.getItem('idUser');
    if (!idUser) {
      console.error('ID de usuario no encontrado en localStorage');
      // Maneja el error (muestra un mensaje al usuario, etc.)
      return; // Detener la función si no hay ID de usuario
    }

    try {
      await newVenta(idUser); 
      navigate('/'); 
    } catch (error) {
      console.error('Error al enviar datos de venta:', error);
      // Maneja el error aquí
    }
  };

  return (
    <div className="exito-container">
      <h2>Pago Exitoso</h2>
      <p>¡Su pago se ha procesado correctamente!</p>
      <button onClick={handleContinuar}>Continuar</button>
    </div>
  );
};

export default Exito;
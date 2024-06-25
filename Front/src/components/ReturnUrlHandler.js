import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { commitTransaction } from '../services/pago';

const ReturnUrlHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCommitTransaction = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const token_ws = urlParams.get('token_ws');

        if (!token_ws) {
          throw new Error('No se encontró token_ws en la URL');
        }

        const response = await commitTransaction(token_ws);
        console.log('Respuesta de commitTransaction:', response);

        // Maneja la respuesta según el estado de la transacción
        if (response.details.status === 'AUTHORIZED') {
          // Redirige a la página de éxito
          navigate('/exito');
        } else {
          // Redirige a la página de fracaso
          navigate('/fracaso');
        }
      } catch (error) {
        console.error('Error al confirmar la transacción', error);
        // Redirige a una página de error si hay un problema
        navigate('/error');
      }
    };

    handleCommitTransaction();
  }, [location, navigate]);

  return (
    <div>
      <h2>Procesando...</h2>
      <p>Espere un momento mientras se procesa su pago.</p>
    </div>
  );
};

export default ReturnUrlHandler;

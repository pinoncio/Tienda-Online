import React, { useEffect } from 'react';

const ProcesandoPago = () => {
  useEffect(() => {
    // Recuperar token_ws desde localStorage
    const token_ws = localStorage.getItem('token_ws');
    console.log('token_ws:', token_ws);

    // Aquí puedes realizar cualquier lógica adicional con token_ws

    // Limpiar localStorage cuando ya no lo necesites
    localStorage.removeItem('token_ws');
  }, []);

  return (
    <div>
      <h2>Procesando Pago</h2>
      <p>Espere un momento mientras se procesa su pago.</p>
    </div>
  );
};

export default ProcesandoPago;

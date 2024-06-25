import React from 'react';

const ProcesandoPago = ({ status }) => {
  return (
    <div>
      <h2>Resultado del Pago</h2>
      <p>{status}</p>
    </div>
  );
};

export default ProcesandoPago;

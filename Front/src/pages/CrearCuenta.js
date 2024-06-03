import React, { useContext } from 'react';
import { useCreateUserForm } from '../components/createuser';
import { AuthContext } from '../AuthContext'; 
import '../styles/crearcuenta.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sendMail from '../services/mail'; 

const CrearCuenta = () => {
  const { login } = useContext(AuthContext); 
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    handleSubmit: handleSubmitForm,
  } = useCreateUserForm();

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleSubmitForm(event);
      if (formData.correo && isEmailValid(formData.correo)) {
        const mailData = {
          to: formData.correo,
          subject: '¡Bienvenido a nuestro sitio!',
          text: `Estimado ${formData.nombre_usuario},

Gracias por registrarte en nuestro sitio. Nos complace darte la bienvenida a nuestra comunidad.

En Creaciones con amor, nos esforzamos por ofrecer la mejor experiencia a nuestros clientes. Si tienes alguna pregunta, inquietud o simplemente quieres hablar con nosotros, no dudes en contactarnos.

Además, te invitamos a seguirnos en Instagram para estar al tanto de nuestras últimas novedades y promociones: https://www.instagram.com/creaciones.con.amoor/.

¡Gracias por elegirnos! Esperamos que disfrutes explorando nuestro sitio y descubriendo todo lo que tenemos para ofrecer.

Atentamente,
El equipo de Creaciones con amor`
        };
        await sendMail(mailData);
        toast.success('Cuenta creada exitosamente');

        login();
      } else {
        throw new Error('Correo electrónico no válido');
      }
    } catch (error) {
      toast.error('Error al crear la cuenta');
    }
  };

  return (
    <div className="form-container">
      <h2 className='h2'>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre_usuario">Nombre</label>
          <input
            type="text"
            id="nombre_usuario"
            name="nombre_usuario"
            value={formData.nombre_usuario}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.nombre_usuario && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="apellido1_usuario">Apellido Paterno</label>
          <input
            type="text"
            id="apellido1_usuario"
            name="apellido1_usuario"
            value={formData.apellido1_usuario}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.apellido1_usuario && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="apellido2_usuario">Apellido Materno</label>
          <input
            type="text"
            id="apellido2_usuario"
            name="apellido2_usuario"
            value={formData.apellido2_usuario}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.apellido2_usuario && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.correo && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="rut_usuario">Rut</label>
          <input
            type="text"
            id="rut_usuario"
            name="rut_usuario"
            value={formData.rut_usuario}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.rut_usuario && <span className="error-message">El campo es obligatorio</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.contrasena && <span className="error-message">El campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección para envío</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.direccion && <span className="error-message">El campo es obligatorio</span>}
        </div>
        
        <div className="form-group">
          <input type="submit" value="Crear Cuenta" />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export { CrearCuenta };

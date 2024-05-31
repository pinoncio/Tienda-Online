import { useState } from 'react';
import { toast } from 'react-toastify';
import { createUser } from '../services/user';
import { useNavigate } from 'react-router-dom';

export const useCreateUserForm = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    apellido1_usuario: '',
    apellido2_usuario: '',
    rut_usuario: '',
    direccion: '',
    contrasena: '',
    correo: '',
  });

  const [errors, setErrors] = useState({
    nombre_usuario: false,
    apellido1_usuario: false,
    apellido2_usuario: false,
    rut_usuario: false,
    direccion: false,
    contrasena: false,
    correo: false,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value === ''
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataWithRole = {
      ...formData,
      id_rol: 3
    };

    console.log("Datos enviados al backend:", formDataWithRole);

    const formErrors = Object.keys(formDataWithRole).reduce((acc, key) => {
      if (formDataWithRole[key] === '') {
        acc[key] = true;
      }
      return acc;
    }, {});
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        await createUser(formDataWithRole);
        toast.success('Cuenta creada correctamente', {
          autoClose: 500,
          onClose: () => navigate('/'),
        });
      } catch (error) {
        console.error('Error al crear la cuenta:', error);
        toast.error('Error al crear la cuenta');
      }
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

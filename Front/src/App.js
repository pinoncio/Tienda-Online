import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './styles.css';
import logo from './image/logo2.png';
import icono from './image/insta.png';
import iconow from './image/wasap.png';
import { Inicio } from './pages/Inicio';
import { Admin } from './pages/admin';
import { Catalogo } from './pages/Catalogo';
import { CrearCuenta } from './pages/CrearCuenta';
import { IniciarSesion } from './pages/IniciarSesion';
import { Carrito } from './pages/Carrito';
import Users from './pages/user';
import Roles from './pages/rol';
import Categoria from './pages/categoria';
import Producto from './pages/producto';
import Venta from './pages/venta';
import { AuthProvider, AuthContext } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="App">
          <header>
            <div className="logo">
              <img src={logo} alt=""/>
            </div>
            <NavBar /> {/* Añade el componente NavBar aquí */}
          </header>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/crear-cuenta" element={<CrearCuenta />} />
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/users" element={<Users />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/categoria" element={<Categoria />} />
            <Route path="/producto" element={<Producto />} />
            <Route path="/venta" element={<Venta />} />
          </Routes>
          <footer>
            <p>&copy; 2024 Creaciones con Amor. Todos los derechos reservados.</p>
            <div className="social-icons">
              <a href="https://wa.me/+56975409834" target="_blank" rel="noopener noreferrer">
                <img src={iconow} alt="Icono de WhatsApp" />
              </a>
              <a href="https://wa.me/+56975409834" target="_blank" rel="noopener noreferrer">
                Contáctanos por WhatsApp
              </a>
              <a href="https://www.instagram.com/creaciones.con.amoor/" target="_blank" rel="noopener noreferrer">
                <img src={icono} alt="Icono de Instagram" />
              </a>
              <a href="https://www.instagram.com/creaciones.con.amoor/" target="_blank" rel="noopener noreferrer">
                Síguenos en Instagram
              </a>
            </div>
          </footer>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

const NavBar = () => {
  const { isAuthenticated, logout } = React.useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="#catalogo">Catálogo</a></li>
        <li><a href="#admin">Admin</a></li>
        <li><a href="#contacto">Contacto</a></li>
        <li><a href="#carrito"><i className="fas fa-shopping-cart"></i></a></li>
        {!isAuthenticated ? (
          <>
            <li className="login"><a href="#crear-cuenta">Crear Cuenta</a></li>
            <li className="login"><a href="#iniciar-sesion">Iniciar Sesión</a></li>
          </>
        ) : (
          <>
            <li>
              <a href="#perfil"><i className="fas fa-user"></i></a>
              <button onClick={logout}>Cerrar Sesión</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default App;

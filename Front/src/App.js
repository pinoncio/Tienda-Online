import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './styles.css';
import logo from './image/logo2.png';
import icono from './image/insta.png';
import iconow from './image/wasap.png';
import { Inicio } from './pages/Inicio';
import { Admin } from './pages/admin';
import { Catalogo } from './pages/Catalogo';
import { DetalleProduct } from './pages/DetalleProduct';
import { CrearCuenta } from './pages/CrearCuenta';
import { IniciarSesion } from './pages/IniciarSesion';
import { Carrito } from './pages/Carrito';
import ReturnUrlHandler from './components/ReturnUrlHandler';
import Exito from './pages/exito';
import Fracaso from './pages/fracaso';
import Users from './pages/user';
import Roles from './pages/rol';
import Categoria from './pages/categoria';
import Producto from './pages/producto';
import VentaAdmin from './pages/ventasAdmin';
import VentaId from './pages/venta';
import DetalleVenta from './pages/detalleVenta';
import PerfilUsuario from './pages/perfil';
import Reporte from './pages/reporte';
import { AuthProvider, AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="App">
          <header>
            <div className="logo">
              <a href="/inicio">
                <img src={logo} alt="" />
              </a>
            </div>
            <NavBar />
          </header>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/detalle-producto/:cod_producto" element={<DetalleProduct />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/crear-cuenta" element={<CrearCuenta />} />
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />
            <Route path="/users" element={<Users />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/categoria" element={<Categoria />} />
            <Route path="/producto" element={<Producto />} />
            <Route path="/ventaAdmin" element={<VentaAdmin />} />
            <Route path="/ventaId" element={<VentaId />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/exito" element={<Exito />} />
            <Route path="/fracaso" element={<Fracaso />} />
            <Route path="/retorno-webpay" element={<ReturnUrlHandler />} />
            <Route path="/detalleVenta/:idVenta" element={<DetalleVenta />} />
            <Route path="/perfil" element={<PerfilUsuario />} />
            <Route path="/reporte" element={<Reporte />} />
          </Routes>
          <br />
          <br />
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
  const navigate = useNavigate();
  const { isAuthenticated, logout } = React.useContext(AuthContext);
  const rol = localStorage.getItem('rol');

  const handleLogout = () => {
    // Eliminar el token y el rol del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('idUser');
    // Limpiar carrito local
    localStorage.removeItem('carritoLocal');
    // Llamar a la función de logout del contexto de autenticación
    logout();
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="#catalogo">Catálogo</a></li>
        {isAuthenticated && rol === '1' && <li><a href="#admin">Admin</a></li>}
        {isAuthenticated && rol === '2' && <li><a href="#admin">Logística</a></li>}
        {isAuthenticated && rol !== '1' && <li><a href="#ventaId">Historial</a></li>}
        {!isAuthenticated ? (
          <>
            <li className="login"><a href="#crear-cuenta">Crear Cuenta</a></li>
            <li className="login"><a href="#iniciar-sesion">Iniciar Sesión</a></li>
          </>
        ) : (
          <>
            <li className="user-container">
              <a href="#perfil"><i className="fas fa-user user-icon"></i></a>
              <i className="fas fa-sign-out-alt logout-icon" onClick={handleLogout}></i>
            </li>
          </>
        )}
        <li><a href="#carrito"><i className="fas fa-shopping-cart"></i></a></li>
      </ul>
    </nav>
  );
};

export default App;

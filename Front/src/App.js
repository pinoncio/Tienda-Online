// src/App.js
import React from "react";
import { HashRouter, Route, Routes } from 'react-router-dom';
import "./styles.css";
import logo from "./image/logo2.png";
import { Inicio } from './pages/Inicio';
import { Admin } from './pages/admin';
import { Catalogo } from './pages/Catalogo';
import { Nosotros } from './pages/Nosotros';
import { Contacto } from './pages/Contacto';
import { CrearCuenta } from './pages/CrearCuenta';
import { IniciarSesion } from './pages/IniciarSesion';
import { Carrito } from './pages/Carrito';
import Users from './pages/user';
import Roles from './pages/rol'
import Categoria from "./pages/categoria";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <header>
          <div className="logo">
            <img src={logo} alt=""/>
          </div>
          <nav>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="#catalogo">Catálogo</a></li>
              <li><a href="#admin">Admin</a></li>
              <li><a href="#contacto">Contacto</a></li>
              <li className="login"><a href="#crear-cuenta">Crear Cuenta</a></li>
              <li className="login"><a href="#iniciar-sesion">Iniciar Sesión</a></li>
              <li><a href="#carrito"><i className="fas fa-shopping-cart"></i></a></li>
              <li><a href="#perfil"><i className="fas fa-user"></i></a></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/crear-cuenta" element={<CrearCuenta />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/categoria" element={<Categoria />} />
        </Routes>
        <footer>
          <p>&copy; 2024 Creaciones con Amor. Todos los derechos reservados.</p>
          <div className="social-icons">
            <a href="https://wa.me/+56975409834" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.instagram.com/creaciones.con.amoor/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;

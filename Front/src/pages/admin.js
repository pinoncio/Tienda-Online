// src/pages/Admin.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClipboardList, faBox, faTags, faShoppingCart, faCogs } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css'; 

function Admin() {
    const navigate = useNavigate();
  
    const handleNavigation = (path) => {
      navigate(path);
    };
  
    return (
      <div className="admin-page">
        <h3>Administracion</h3>
        
        <div className="admin-container"> 
          <div className="admin-options">
            <div className="admin-card" onClick={() => handleNavigation('/users')}>
              <FontAwesomeIcon icon={faUsers} size="3x" className="icon"/>
              <p>Usuarios</p>
            </div>
            <div className="admin-card" onClick={() => handleNavigation('/roles')}>
              <FontAwesomeIcon icon={faCogs} size="3x" className="icon" />
              <p>Roles</p>
            </div>
            <div className="admin-card" onClick={() => handleNavigation('/products')}>
              <FontAwesomeIcon icon={faBox} size="3x" className="icon" />
              <p>Productos</p>
            </div>
            <div className="admin-card" onClick={() => handleNavigation('/orders')}>
              <FontAwesomeIcon icon={faClipboardList} size="3x" className="icon"/>
              <p>Pedidos</p>
            </div>
            <div className="admin-card" onClick={() => handleNavigation('/categoria')}>
              <FontAwesomeIcon icon={faTags} size="3x" className="icon"/>
              <p>Categorías</p>
            </div>
            <div className="admin-card" onClick={() => handleNavigation('/sales')}>
              <FontAwesomeIcon icon={faShoppingCart} size="3x" className="icon"/>
              <p>Ventas</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export { Admin };
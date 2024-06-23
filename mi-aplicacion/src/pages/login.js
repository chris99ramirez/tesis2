import React, { useState } from 'react';
import './login.scss';
import logo from '../images/logo.jpg';
import fondo from '../images/Bodega.jpg';
import { Navigate,useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin123@gmail.com' && password === 'contrasena') {
        navigate("/Products"); 
    } else {
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src={fondo} alt="Tienda" className="store-image" />
      </div>
      <div className="login-form-container">
        <div className="logo-container">
          <img src={logo} alt="Comercia.pe Logo" className="logo" />
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Iniciar sesión</h2>
          <div className="form-group">
            <label htmlFor="email">Correo</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn-login" type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

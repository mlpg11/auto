import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logoImage from '../assets/logo.png';

function Header() {
  const connectWalletHandler = () => {
    // TODO: METAMASK WALLET CONNECTION HANDLER
    console.log('Conectar carteira');
  };

  return (
    <header className="header">
      {/* Logo */}
      <img src={logoImage} alt="Logo" className="logo" />
      
      {/* Navegação */}
      <nav>
        <ul>
          <li>
            <NavLink to="/explorar" activeClassName="active">Explorar</NavLink>
          </li>
          <li>
            <NavLink to="/meus-tokens" activeClassName="active">Meus tokens</NavLink>
          </li>
        </ul>
      </nav>
      
      {/* Botão de Conectar Carteira */}
      <button onClick={connectWalletHandler} className="wallet-button">
        Conectar Carteira
      </button>
    </header>
  );
}

export default Header;

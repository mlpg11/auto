import React from 'react';
import './Header.css';
import logoImage from '../assets/logo.png';
import iconImage from '../assets/icon.png';
import { NavLink } from 'react-router-dom';
import { useSDK } from '@metamask/sdk-react';
import { useLanguage } from '../LanguageContext';

function Header() {
  const { sdk, connected } = useSDK();
  const { isEnglish, toggleLanguage } = useLanguage();

  const connectWalletHandler = async () => {
    try {
      if (!connected) {
        // Tenta conectar com a MetaMask
        await sdk.connect();
      } else {
        console.log('Já está conectado');
      }
    } catch (error) {
      console.error('Erro ao conectar com a MetaMask:', error);
    }
  };

  return (
    <header className="header">
      {/* Logo */}
      <img src={logoImage} alt="Logo" className="logo desktop" />
      <img src={iconImage} alt="Icon" className="logo mobile" />

      {/* Navegação */}
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/explorar" className="nav-link" activeClassName="active">Explorar</NavLink>
          </li>
          <li>
            <NavLink to="/meus-tokens" className="nav-link" activeClassName="active">Meus tokens</NavLink>
          </li>
          <li>
            <NavLink to="/simular" className="nav-link" activeClassName="active">Simular</NavLink>
          </li>
        </ul>
      </nav>

      {/* Botão de Tradução */}
      <button onClick={toggleLanguage} className="language-button">
        {isEnglish ? 'PT' : 'EN'}
      </button>

      {/* Botão de Conectar Carteira */}
      <button onClick={connectWalletHandler} className="wallet-button">
        {connected ? 'Conectado' : 'Conectar Carteira'}
      </button>
    </header>
  );
}

export default Header;
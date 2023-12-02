import React from 'react';
import './Header.css';
import logoImage from '../assets/logo.png';
import iconImage from '../assets/icon.png';
import { NavLink } from 'react-router-dom';
import { useSDK } from '@metamask/sdk-react';
import { useLanguage } from '../LanguageContext';
import pt from '../assets/pt.png';
import en from '../assets/en.png';

function Header() {
  const { sdk, connected } = useSDK();
  const { isEnglish, toggleLanguage } = useLanguage()

  const connectWalletHandler = async () => {
    try {
      if (!connected) {
        // Tenta conectar com a MetaMask
        await sdk.connect();
      } else {
        console.log('Already connected');
      }
    } catch (error) {
      console.error('Error connecting with MetaMask:', error);
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
            <NavLink to="/explorar" className="nav-link" activeClassName="active">Explore</NavLink>
          </li>
          <li>
            <NavLink to="/meus-tokens" className="nav-link" activeClassName="active">My tokens</NavLink>
          </li>
        </ul>
      </nav>

      {/* Botão de Tradução */}
      <button onClick={toggleLanguage} className="language-button">
        {isEnglish ? 'PT' : 'EN'}
      </button>

      {/* Botão de Conectar Carteira */}
      <button onClick={connectWalletHandler} className="wallet-button">
        {connected ? 'Connected' : 'Connect Wallet'}
      </button>
    </header>
  );
}

export default Header;

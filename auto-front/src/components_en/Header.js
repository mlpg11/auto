import React, { useState } from 'react';
import '../components/Header.css';
import logoImage from '../assets/logo.png';
import iconImage from '../assets/icon.png';
import { NavLink } from 'react-router-dom';
import { useSDK } from '@metamask/sdk-react';
import { useLanguage } from '../LanguageContext';
import pt from '../assets/pt.png';
import en from '../assets/en.png';

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      {/* Logo */}
      <img src={logoImage} alt="Logo" className="logo desktop" />
      <img src={iconImage} alt="Icon" className="logo mobile" />

      {/* So disponivel qnd vh < 800*/}
      <button onClick={toggleMenu} className="hamburger-menu">☰</button>

      {/* Navegação */}
      <nav>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <NavLink to="/explorar" className="nav-link" activeClassName="active">Explorar</NavLink>
          </li>
          <li>
            <NavLink to="/meus-tokens" className="nav-link" activeClassName="active">Meus tokens</NavLink>
          </li>
          <li>
            <NavLink to="/simular" className="nav-link" activeClassName="active">Simular</NavLink>
          </li>
          <li>
            <NavLink to="/transparencia" className="nav-link" activeClassName="active">Transparência</NavLink>
          </li>
        </ul>
      </nav>

      {/* Botão de Tradução */}
      <div className='lbdiv'>
        <button onClick={toggleLanguage} className="language-button">
          <img className='language-button'
            src={isEnglish ? pt : en} 
            alt={isEnglish ? "Switch to Portuguese" : "Switch to English"} 
          />
        </button>
        <p>{isEnglish ? "Português" : "English"}</p>
      </div>
      
      {/* Botão de Conectar Carteira */}
      <button onClick={connectWalletHandler} className="wallet-button">
        {connected ? 'Conectado' : 'Conectar Carteira'}
      </button>
    </header>
  );
}

export default Header;

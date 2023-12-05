import React, { useState } from 'react';
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
  const { isEnglish, toggleLanguage } = useLanguage();

  const connectWalletHandler = async () => {
    try {
      if (!connected) {
        await sdk.connect();
      } else {
        console.log('Already connected');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
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

      {/* Only available when vh < 800 */}
      <button onClick={toggleMenu} className="hamburger-menu">☰</button>

      {/* Navigation */}
      <nav>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <NavLink to="/explorar" className="nav-link" activeClassName="active">Explore</NavLink>
          </li>
          <li>
            <NavLink to="/meus-tokens" className="nav-link" activeClassName="active">My Tokens</NavLink>
          </li>
          <li>
            <NavLink to="/simular" className="nav-link" activeClassName="active">Simulate</NavLink>
          </li>
          <li>
            <NavLink to="/transparencia" className="nav-link" activeClassName="active">Transparency</NavLink>
          </li>
        </ul>
      </nav>

      {/* Language Button */}
      <div className='lbdiv'>
        <button onClick={toggleLanguage} className="language-button">
          <img className='language-button'
            src={isEnglish ? pt : en} 
            alt={isEnglish ? "Mudar para Português" : "Change to English"} 
          />
        </button>
        <p>{isEnglish ? "Portuguese" : "English"}</p>
      </div>
      
      {/* Connect Wallet Button */}
      <button onClick={connectWalletHandler} className="wallet-button">
        {connected ? 'Connected' : 'Connect Wallet'}
      </button>
    </header>
  );
}

export default Header;
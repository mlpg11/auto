import React from 'react';
import './NotFound.css';
import logoImage from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

function NotFound() {
    return (
        <div id="main">
            <div id="logo">
                <img src={logoImage} alt="Logo" />
            </div>
            <div className="not-found">
                <div id="image">
                    <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
                    <h1 id="404">Erro 404</h1>
                </div>
                
                <h1>Página Não Encontrada</h1>
                <p>Desculpe, a página que você está procurando não existe.</p>
                <NavLink id="nav" to="/">Voltar ao Início</NavLink>
            </div>
        </div>
    );
}

export default NotFound;

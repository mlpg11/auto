import React from 'react';
import './NotFound.css';
import logoImage from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import NotFoundEn from '../components_en/NotFound';

function NotFound() {
    const { isEnglish } = useLanguage();

    if (isEnglish) {
        return <NotFoundEn />;
    }
    return (
        <div id="main">
            <div id="logo">
                <img src={logoImage} alt="Logo" />
            </div>
            <div className="not-found">
                <div id="image">
                    <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
                    <h1 id="404">Error 404</h1>
                </div>
                
                <h1>Page Not Found</h1>
                <p>Sorry, page you are looking for doesn't exists.</p>
                <NavLink id="nav" to="/">Back to Home</NavLink>
            </div>
        </div>
    );
}

export default NotFound;

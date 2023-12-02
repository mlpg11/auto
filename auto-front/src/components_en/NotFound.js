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
                    <h1 id="404">Error 404</h1>
                </div>
                
                <h1>Page Not Found</h1>
                <p>Sorry, the page you are looking for doesn't exist.</p>
                <NavLink id="nav" to="/">Back to Home</NavLink>
            </div>
        </div>
    );
}

export default NotFound;

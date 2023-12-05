import React from 'react';
import './Footer.css';

function Footer (){
    const currentYear = new Date().getFullYear();

    return (
        <div className='footer-content'>
            <p>&copy; {currentYear} Auto Copyright &reg;</p>
        </div>
    );
}

export default Footer;
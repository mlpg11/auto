import React from 'react';
import './Modal.css'; // Importe o CSS para o modal

function Detalhes({ closeModal }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={closeModal} className="close-button">&times;</button>
                {/* O restante do conteúdo do seu modal */}
            </div>
        </div>
    );
}

export default Detalhes;
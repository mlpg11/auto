import React, { useState } from 'react';
import Modal from 'react-modal';
import './Card.css';
import Detalhes from './Modals/Detalhes';
import Simular from './Modals/Simular';
import Comprar from './Modals/Comprar';

Modal.setAppElement('#root');

function Card({ id, title, tipo, profitability, real_profitability, due, risk, nomeToken, valorConversaoPublica, valorConversaoSecundario }) {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

    // Funções para abrir cada modal
    const openDetailsModal = () => setIsDetailsModalOpen(true);
    const openSimulateModal = () => setIsSimulateModalOpen(true);
    const openBuyModal = () => setIsBuyModalOpen(true);

    // Funções para fechar cada modal
    const closeDetailsModal = () => setIsDetailsModalOpen(false);
    const closeSimulateModal = () => setIsSimulateModalOpen(false);
    const closeBuyModal = () => setIsBuyModalOpen(false);

    const getTipoClass = (tipo) => {
        const typeColorMap = {
            'selic': 'selic',
            'prefixado': 'prefixado',
            'ipca+': 'ipca',
            'renda+': 'renda',
        };
        return typeColorMap[tipo.toLowerCase()] || 'default-header';
    };

    return (
        <div className="card">
            <div className={`card-header ${getTipoClass(tipo)}`}>{titulo}</div>
            <div className="card-body">
                <div className="data-container" id="rentabilidade">
                    <p className="label">PROFITABILITY</p> 
                    <p className="data">{profitability}</p>
                </div>
                <div className="data-container" id="rentabilidade_real">
                    <p className="label">REAL PROFITABILITY</p> 
                    <p className="data">{real_profitability}% a.a</p>
                </div>
                <div className="data-container" id="vencimento">
                    <p className="label">DUE</p> 
                    <p className="data">{due}</p>
                </div>
                <div className="data-container" id="risco">
                    <p className="label">RISK</p> 
                    <p className="data">{risk}</p>
                </div>
            </div>
            
            <div className="card-footer">
                <div id="fileira1">
                    <button onClick={openDetailsModal} className="fileira1-button">Details</button>
                    <button onClick={openSimulateModal} className="fileira1-button">Simulate</button>
                </div>
                
                <button onClick={openBuyModal} className={`comprar-button ${getTipoClass(tipo)}`}>Buy</button>
            </div>

            {/* Modal de Detalhes */}
            <Modal 
                isOpen={isDetailsModalOpen} 
                onRequestClose={closeDetailsModal}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <Detalhes closeModal={closeDetailsModal}></Detalhes>
            </Modal>

            {/* Modal de Simular */}
            <Modal 
                isOpen={isSimulateModalOpen} 
                onRequestClose={closeSimulateModal}
                className="modal-content"
                overlayClassName="modal-overlay"
                >
                <Simular closeModal={closeSimulateModal}></Simular>
            </Modal>

            {/* Modal de Comprar */}
            <Modal 
                isOpen={isBuyModalOpen} 
                onRequestClose={closeBuyModal}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <Comprar 
                    titulo={title}
                    token={nomeToken}
                    valorConversaoPublica={valorConversaoPublica}
                    valorConversaoSecundario={valorConversaoSecundario}
                    closeModal={closeBuyModal}>
                </Comprar>
            </Modal>
        </div>
    );
}

export default Card;

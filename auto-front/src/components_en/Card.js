import React, { useState } from 'react';
import Modal from 'react-modal';
import './Card.css';
import { Comprar } from './Modals/Comprar';

Modal.setAppElement('#root');

function Card({ id, titulo, tipo, rentabilidade, rentabilidade_real, vencimento, risco, nomeToken, valorConversaoPublica, valorFinal, totalInvestido, ganho}) {
    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

    // Funções para abrir cada modal
    const openBuyModal = () => setIsBuyModalOpen(true);
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

    if (valorFinal != null){
        return (
            <div className="card">
                <div className={`card-header ${getTipoClass(tipo)}`}>{titulo}</div>
                <div className="card-body">
                    <div className="data-container" id="rentabilidade">
                        <p className="label">PROFITABILITY</p> 
                        <p className="data">{rentabilidade}</p>
                    </div>
                    <div className="data-container" id="vencimento">
                        <p className="label">DUE</p> 
                        <p className="data">{vencimento}</p>
                    </div>
                    <div className="data-container" id="risco">
                        <p className="label">RISK</p> 
                        <p className="data">{risco}</p>
                    </div>
                    <div className="data-container" id="valorFinal">
                        <p className="label">FINAL AMOUNT</p> 
                        <p className="data">{valorFinal} ETH</p>
                    </div>
                    <div className="data-container" id="totalInvestido">
                        <p className="label">TOTAL INVESTED</p> 
                        <p className="data">{totalInvestido} ETH</p>
                    </div>
                    <div className="data-container" id="ganho">
                        <p className="label">EARNING</p> 
                        <p className="data"><span className='green'>+ {ganho} ETH</span></p>
                    </div>
                </div>
                
                <div className="card-footer">
                    <a href="https://www.tesourodireto.com.br/titulos/tipos-de-tesouro.htm" target="_blank"><button className="fileira1-button">Details</button></a>
                    <button onClick={openBuyModal} className={`comprar-button ${getTipoClass(tipo)}`}>Buy</button>
                </div>

                {/* Modal de Comprar */}
                <Modal 
                    isOpen={isBuyModalOpen} 
                    onRequestClose={closeBuyModal}
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <Comprar 
                        titulo={titulo}
                        token={nomeToken}
                        valorConversaoPublica={valorConversaoPublica}
                        closeModal={closeBuyModal}>
                    </Comprar>
                </Modal>
            </div>
        )
    }

    return (
        <div className="card">
            <div className={`card-header ${getTipoClass(tipo)}`}>{titulo}</div>
            <div className="card-body">
                <div className="data-container" id="rentabilidade">
                    <p className="label">RENTABILIDADE</p> 
                    <p className="data">{rentabilidade}</p>
                </div>
                <div className="data-container" id="rentabilidade_real">
                    <p className="label">RENTABILIDADE REAL</p> 
                    <p className="data">{rentabilidade_real}% a.a</p>
                </div>
                <div className="data-container" id="vencimento">
                    <p className="label">VENCIMENTO</p> 
                    <p className="data">{vencimento}</p>
                </div>
                <div className="data-container" id="risco">
                    <p className="label">RISCO</p> 
                    <p className="data">{risco}</p>
                </div>
            </div>
            
            <div className="card-footer">
                <a href="https://www.tesourodireto.com.br/titulos/tipos-de-tesouro.htm" target="_blank"><button href="https://www.tesourodireto.com.br/titulos/tipos-de-tesouro.htm" target="_blank" className="fileira1-button">Detalhes</button></a>
                <button onClick={openBuyModal} className={`comprar-button ${getTipoClass(tipo)}`}>Comprar</button>
            </div>

            {/* Modal de Comprar */}
            <Modal 
                isOpen={isBuyModalOpen} 
                onRequestClose={closeBuyModal}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <Comprar 
                    titulo={titulo}
                    token={nomeToken}
                    valorConversaoPublica={valorConversaoPublica}
                    closeModal={closeBuyModal}>
                </Comprar>
            </Modal>
        </div>
    );
}

export default Card;

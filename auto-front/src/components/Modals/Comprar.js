import React, { useState } from 'react';
import './Modal.css'; 

function Comprar({ titulo, token, valorConversaoPublica, valorConversaoSecundario, closeModal, }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={closeModal} className="close-button">&times;</button>
                
                <h2>{titulo} ({token})</h2>

                <button onClick={() => tipoOfertaHandler('publica')}>Oferta Pública</button>
                <button onClick={() => tipoOfertaHandler('secundario')}>Mercado Secundário</button>

                {tipoOferta === 'publica' ? (
                    <div>
                        {/* Conteúdo para oferta pública */}
                        <div>
                            <input
                                type="number"
                                value={real}
                                onChange={handleRealChange}
                                placeholder="R$"
                            />
                            <span> ou </span>
                            <input
                                type="number"
                                value={eth}
                                onChange={handleEthChange}
                                placeholder="ETH"
                            />
                            <p>Novo saldo: {eth} Tokens {token}</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        
                        {/* Conteúdo para mercado secundário - Repita o layout acima, mas ajuste para o valor de conversão do mercado secundário */}
                        <div>
                            <input
                                type="number"
                                value={real}
                                onChange={handleRealChange}
                                placeholder="R$"
                            />
                            <span> ou </span>
                            <input
                                type="number"
                                value={eth}
                                onChange={handleEthChange}
                                placeholder="ETH"
                            />
                            <p>Novo saldo: {eth} Tokens {token}</p>
                        </div>
                </div>
            )}

            <button>Detalhes</button>
            <button>Comprar</button>
            </div>
        </div>
    );
}

export default Comprar;
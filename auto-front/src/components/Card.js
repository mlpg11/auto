import React from 'react';
import './Card.css';

function Card({ id, titulo, tipo, rentabilidade, vencimento, investimento_minimo, risco }) {
    
    const getTipoClass = (tipo) => {
        const typeColorMap = {
            'selic': 'selic',
            'prefixado': 'prefixado',
            'ipca+': 'ipca',
            'renda+': 'renda',
            'outros': 'outros'
        };
        return typeColorMap[tipo.toLowerCase()] || 'default-header';
    };

    return (
        <div className="card">
            <div className={`card-header ${getTipoClass(tipo)}`}>{titulo}</div>
            <div className="card-body">
                <div className="data-container" id="rentabilidade">
                    <p className="label">RENTABILIDADE</p> 
                    <p className="data">{rentabilidade}</p>
                </div>
                <div className="data-container" id="vencimento">
                    <p className="label">VENCIMENTO</p> 
                    <p className="data">{vencimento}</p>
                </div>
                <div className="data-container" id="investimento_minimo">
                    <p className="label">INVESTIMENTO MÍNIMO</p> 
                    <p className="data">{investimento_minimo}</p>
                </div>
                <div className="data-container" id="risco">
                    <p className="label">RISCO</p> 
                    <p className="data">{risco}</p>
                </div>
            </div>
            
            <div className="card-footer">
                <div id="fileira1">
                    <button className="fileira1-button">Detalhes</button>
                    <button className="fileira1-button">Simular</button>
                </div>
                
                <button className={`comprar-button ${getTipoClass(tipo)}`}>Comprar</button>
            </div>
        </div>
    );
}

export default Card;

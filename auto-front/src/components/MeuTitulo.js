import React from "react";
import './MeuTitulo.css'

function MeuTitulo ({tipo, nomeTitulo, nomeToken, vencimento, rentabilidade, quantia }) {

    const getTipoClass = (tipo) => {
        const typeColorMap = {
            'selic': 'selic1',
            'prefixado': 'prefixado1',
            'ipca+': 'ipca1',
            'renda+': 'renda1',
        };
        return typeColorMap[tipo.toLowerCase()] || 'default-header';
    };

    return (
        <div className="mt-row">
            <div className="mt-row-element" id="first">
                <div className={`borda ${getTipoClass(tipo)}`}>

                </div>
            </div>

            <div className="mt-row-element">
                <p className="mt-label">Título</p>
                <p>{nomeTitulo}</p>
            </div>
            
            <div className="h-spacer"></div>
            
            <div className="mt-row-element">
                <p className="mt-label">Token</p>
                <p>{nomeToken}</p>
            </div>

            <div className="h-spacer"></div>
            
            <div className="mt-row-element">
                <p className="mt-label">Vencimento</p>
                <p>{vencimento}</p>
            </div>

            <div className="h-spacer"></div>

            <div className="mt-row-element">
                <p className="mt-label">Rentabilidade</p>
                <p>{rentabilidade}</p>
            </div>

            <div className="h-spacer"></div>

            <div className="mt-row-element">
                <p className="mt-label">Quantia</p>
                <p>{quantia}</p>
            </div>

            <div className="h-spacer"></div>

            <div className="mt-row-element">
                <button className={`mtbutton ${getTipoClass(tipo)}`}>Trocar</button>
                <button className={`mtbutton ${getTipoClass(tipo)}`}>Vender</button>
            </div>


        </div>
    );
}

export default MeuTitulo;
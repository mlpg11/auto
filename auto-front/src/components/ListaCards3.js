import React from 'react';
import MeuTitulo from './MeuTitulo';
import './ListaCards3.css';

function ListaCards3({ cards }) {
    // Verifica se cards está vazio ou nulo
    if (!cards || cards.length === 0) {
        return (
            <div className='grid-titulos'>
                <div className='vazio'>
                    <p>Conecte a sua carteira MetaMask.</p>
                    <a href="https://metamask.io" target={"_blank"}>Criar Carteira</a>
                </div>
            </div>
        );
    } else {
        return (
            <div className='grid-titulos'>
                {cards.map((titulo, index) => (
                    <MeuTitulo
                        key={index} // Adiciona uma chave única
                        tipo={titulo.tipo}
                        rentabilidade={titulo.rentabilidade}
                        nomeTitulo={titulo.nomeTitulo}
                        nomeToken={titulo.nomeToken}
                        vencimento={titulo.vencimento}
                        quantia={titulo.quantia}
                    />
                ))}
            </div>
        );
    }
}

export default ListaCards3;

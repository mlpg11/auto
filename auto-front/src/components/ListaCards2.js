import React from 'react';
import Card from './Card';
import './ListaCards.css';

function ListaCards2({cards}) {

    return (
        <div className='grid-cards'>
            {cards.map((card) => (
                <Card
                key={card.id}
                titulo={card.titulo}
                tipo={card.tipo}
                rentabilidade={card.rentabilidade}
                rentabilidade_real={card.rentabilidade_real}
                vencimento={card.vencimento}
                investimento_minimo={card.investimento_minimo}
                risco={card.risco}
                nomeToken={card.nomeToken} 
                valorConversaoPublica={card.valorConversaoPublica}
                valorFinal={card.valorFinal}
                totalInvestido={card.totalInvestido}
                ganho={card.ganho}
                />
            ))}
        </div>
        
    );
}

export default ListaCards2;

import React from 'react';
import Card from './Card';
import './ListaCards.css';

function ListaCards({cards}) {

    return (
        <div className='grid-cards'>
            {cards.map((card) => (
                <Card
                key={card.id}
                title={card.title}
                tipo={card.tipo}
                profitability={card.profitability}
                real_profitability={card.real_profitability}
                due={card.due}
                investimento_minimo={card.investimento_minimo}
                risk={card.risk}
                nomeToken={card.nomeToken} 
                valorConversaoPublica={card.valorConversaoPublica}
                valorConversaoSecundario={card.valorConversaoSecundario}
                />
            ))}
        </div>
        
    );
}

export default ListaCards;

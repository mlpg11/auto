import React from 'react';
import Card from './Card';
import './ListaCards.css';

function ListaCards({cards}) {
    

    return (
        <div className='grid-cards'>
            {cards.map((card) => (
                <Card
                key={card.id}
                titulo={card.titulo}
                tipo={card.tipo}
                rentabilidade={card.rentabilidade}
                vencimento={card.vencimento}
                investimento_minimo={card.investimento_minimo}
                risco={card.risco}
                />
            ))}
        </div>
        
    );
}

export default ListaCards;

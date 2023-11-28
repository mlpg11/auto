import React from 'react';
import Card from './Card';
import './ListaCards.css';

function ListaCards() {
    const cards = [
        {
            titulo: 'Tesouro Selic',
            tipo: 'selic',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        }
    ];

    return (
        <div id="main">
        {cards.map((card) => (
            <Card
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

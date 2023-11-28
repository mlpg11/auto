import React from 'react';
import Card from './Card';
import './ListaCards.css';

function ListaCards() {
    const cards = [
        {
            id: '0',
            titulo: 'Tesouro Selic',
            tipo: 'selic',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '1',
            titulo: 'Tesouro Selic',
            tipo: 'prefixado',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '2',
            titulo: 'Tesouro Selic',
            tipo: 'ipca+',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '3',
            titulo: 'Tesouro Selic',
            tipo: 'renda+',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '4',
            titulo: 'Tesouro Selic',
            tipo: 'outros',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '5',
            titulo: 'Tesouro Selic',
            tipo: 'renda+',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '6',
            titulo: 'Tesouro Selic',
            tipo: 'ipca+',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '7',
            titulo: 'Tesouro Selic',
            tipo: 'renda+',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        }
    ];

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

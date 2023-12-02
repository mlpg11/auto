import React, { useEffect, useState } from 'react';
import SimulateBar from './SimulateBar';
import SortBar from './SortBar';
import Header from './Header';
import ListaCards2 from './ListaCards2';
import { getCards } from './SelecionaCards';
import Footer from './Footer';
import { useLanguage } from '../LanguageContext';

function Simular() {
    const { isEnglish } = useLanguage();
    const [currentCards, setCurrentCards] = useState([]);

    // sort bar
    const [sorting, setSorting] = useState({
        valorFinal: '',
        ganho: ''
    });

    const handleSortChange = (newSorting) => {
        setSorting(newSorting);
    };
    
    const handleSimulate = (simulacao) => {
        // Suponha que 'selectCards' retorna uma Promise que resolve para a lista de cards
        getCards().then(cards => {
            const updatedCards = cards.map(card => {
                const taxaAnual = parseFloat(card.rentabilidade_real) / 100; // Converte para decimal
                const taxaMensal = taxaAnual / 12; // Taxa de juros mensal
                let valorAcumulado = parseFloat(simulacao.valorInicial);
                let totalInvestido = valorAcumulado; // Inclui o valor inicial

                // Aplica o cálculo de juros compostos para cada mês
                for (let mes = 1; mes <= simulacao.tempoInvestimento; mes++) {
                    valorAcumulado = (valorAcumulado + parseFloat(simulacao.valorMensal)) * (1 + taxaMensal);
                    totalInvestido += parseFloat(simulacao.valorMensal);
                }

                const valorFinalArredondado = parseFloat(valorAcumulado.toFixed(5));
                const totalInvestidoArredondado = parseFloat(totalInvestido.toFixed(5));
                const ganho = valorAcumulado - totalInvestido;
                const ganhoArredondado = parseFloat(ganho.toFixed(5))

                return {
                    ...card,
                    valorFinal: valorFinalArredondado,
                    totalInvestido: totalInvestidoArredondado,
                    ganho: ganhoArredondado
                };
            });
            
            setCurrentCards(updatedCards);
        });
    };

    useEffect(() => {
        const loadCards = async () => {
            try {
                const cards = await getCards();
                setCurrentCards(cards);
            } catch (error) {
                console.error('Falha ao carregar os cards:', error);
            }
        }

        loadCards();
    }, []);

    return (
        <div>
            <Header></Header>
            <SimulateBar onSimulate={handleSimulate} />
            <SortBar onSortChange={handleSortChange} options={sorting} />
            <ListaCards2 cards={currentCards}/>
            <Footer></Footer>
        </div>
    );
}

export default Simular;
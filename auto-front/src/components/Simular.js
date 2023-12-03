import React, { useEffect, useState } from 'react';
import SimulateBar from './SimulateBar';
import SortBar from './SortBar';
import Header from './Header';
import ListaCards2 from './ListaCards2';
import { applySorting, applyFilters, getCards } from './SelecionaCards';
import Footer from './Footer';
import { useLanguage } from '../LanguageContext';

function Simular() {
    const { isEnglish } = useLanguage();
    const [currentCards, setCurrentCards] = useState([]);

    const [filters, setFilters] = useState({
        tesouroSelic: true,
        tesouroPrefixado: true,
        tesouroIPCA: true,
        tesouroRenda: true
    });

    // sort bar
    const [sorting, setSorting] = useState({
        valorFinal: '',
        ganho: ''
    });

    const handleSortChange = (newSorting) => {
        setSorting(newSorting);
        setCurrentCards(currentCards => applySorting(applyFilters(currentCards, filters), newSorting));
    };
    
    const handleSimulate = (simulacao) => {
        // Suponha que 'selectCards' retorna uma Promise que resolve para a lista de cards
        getCards().then(cards => {
            const currentDate = new Date();
            const updatedCards = cards.map(card => {
                const taxaAnual = parseFloat(card.rentabilidade_real) / 100; // Converte para decimal
                const taxaMensal = taxaAnual / 12; // Taxa de juros mensal
                let valorAcumulado = parseFloat(simulacao.valorInicial);
                let totalInvestido = valorAcumulado; // Inclui o valor inicial
                let dataSimulada = new Date(currentDate); // Começa a simulação na data atual

                const [diaVenc, mesVenc, anoVenc] = card.vencimento.split('/').map(Number);
                const dataVencimento = new Date(anoVenc, mesVenc - 1, diaVenc); // Mês é 0-indexado
                // Aplica o cálculo de juros compostos para cada mês
                for (let mes = 1; mes <= simulacao.tempoInvestimento; mes++) {
                    if (dataSimulada >= dataVencimento) {
                        return false; // Interrompe se a data simulada ultrapassar a data de vencimento
                    }

                    valorAcumulado = (valorAcumulado + parseFloat(simulacao.valorMensal)) * (1 + taxaMensal);
                    totalInvestido += parseFloat(simulacao.valorMensal);
                    dataSimulada.setMonth(dataSimulada.getMonth() + 1); // Avança um mês na simulação
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
            
            setCurrentCards(currentCards => applySorting(applyFilters(updatedCards, filters), sorting));
        });
    };

    useEffect(() => {
        const loadCards = async () => {
            try {
                const cards = await getCards();
                setCurrentCards(currentCards => applySorting(applyFilters(cards, filters), sorting));
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
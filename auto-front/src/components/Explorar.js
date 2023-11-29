import React, { useEffect, useState } from 'react';
import FilterBar from './FilterBar';
import SortBar from './SortBar';
import Header from './Header';
import ListaCards from './ListaCards';
import SelecionaCards, { selectCards } from './SelecionaCards';

function Explorar() {
    const [currentCards, setCurrentCards] = useState([]);

    // filter bar
    const [filters, setFilters] = useState({
        tesouroSelic: true,
        tesouroPrefixado: true,
        tesouroIPCA: true,
        tesouroRenda: true,
        outros: false,
        searchTerm: ''
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        // Aqui você também pode fazer chamadas para atualizar os dados exibidos
        // com base nos novos filtros
    };

    // sort bar
    const [sorting, setSorting] = useState({
        titulo: '',
        rentabilidade: '',
        vencimento: '',
        minimo: '',
        risco: '',
    });

    const handleSortChange = (newSorting) => {
        setSorting(newSorting);
        // Atualize os dados exibidos com base na nova ordenação
    };

    useEffect(() => {
        selectCards(filters, sorting).then(selectedCards => {
            setCurrentCards(selectedCards);
        });
    }, [filters, sorting]);

    return (
        <div>
            <Header></Header>
            <SortBar onSortChange={handleSortChange} />
            <FilterBar onFilterChange={handleFilterChange} />
            <ListaCards cards={currentCards}/>
        </div>
    );
}

export default Explorar;
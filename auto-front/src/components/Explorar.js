import React, { useState } from 'react';
import FilterBar from './FilterBar';
import SortBar from './SortBar';
import Header from './Header';
import ListaCards from './ListaCards';

function Explorar() {
    // filter bar
    const [filters, setFilters] = useState({
        sortOrder: 'titulo',
        tesouroDireto: true,
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

    return (
        <div>
            <Header></Header>
            <SortBar onSortChange={handleSortChange} />
            <FilterBar onFilterChange={handleFilterChange} />
            <ListaCards/>
        </div>
    );
}

export default Explorar;

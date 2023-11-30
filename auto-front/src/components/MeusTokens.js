import React, { useState } from 'react';
import FilterBar from './FilterBar';
import SortBar from './SortBar';
import Header from './Header';
import ListaCards from './ListaCards';
import Footer from './Footer';

function MeusTokens() {
    // filter bar
    const [filters, setFilters] = useState({
        sortOrder: 'titulo',
        tesouroDireto: true,
        outros: false,
        searchTerm: ''
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div>
            <Header></Header>
            <FilterBar onFilterChange={handleFilterChange} />
            <Footer></Footer>
        </div>
    );
}

export default MeusTokens;

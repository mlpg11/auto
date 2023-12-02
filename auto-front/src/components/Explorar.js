import React, { useEffect, useState } from 'react';
import FilterBar from './FilterBar';
import SortBar from './SortBar';
import Header from './Header';
import ListaCards from './ListaCards';
import { selectCards } from './SelecionaCards';
import Footer from './Footer';
import { useLanguage } from '../LanguageContext';
import ExplorarEn from '../components_en/Explorar';

function Explorar() {
    const { isEnglish } = useLanguage();

    const [currentCards, setCurrentCards] = useState([]);

    // filter bar
    const [filters, setFilters] = useState({
        tesouroSelic: true,
        tesouroPrefixado: true,
        tesouroIPCA: true,
        tesouroRenda: true,
        searchTerm: ''
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    // sort bar
    const [sorting, setSorting] = useState({
        titulo: '',
        rentabilidade_real: '',
        vencimento: '',
        risco: '',
    });

    const handleSortChange = (newSorting) => {
        setSorting(newSorting);
    };

    useEffect(() => {
        selectCards(filters, sorting).then(selectedCards => {
            setCurrentCards(selectedCards);
        });
    }, [filters, sorting]);

    if (isEnglish) {
        return <ExplorarEn/>;
    }
    
    return (
        <div>
            <Header></Header>
            <SortBar onSortChange={handleSortChange} options={sorting}/>
            <FilterBar onFilterChange={handleFilterChange} options={filters}/>
            <ListaCards cards={currentCards}/>
            <Footer></Footer>
        </div>
    );
}


export default Explorar;
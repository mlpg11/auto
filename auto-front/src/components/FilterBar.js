import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './FilterBar.css';

function FilterBar({ onFilterChange }) {
    const [filters, setFilters] = useState({
        tesouroSelic: false,
        tesouroPrefixado: false,
        tesouroIPCA: false,
        tesouroRenda: false,
        outros: false,
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters, [name]: checked };
            onFilterChange({ ...updatedFilters, searchTerm });
            console.log(updatedFilters);
            return updatedFilters;
        });
        
    };
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onFilterChange({ ...filters, searchTerm: e.target.value });
    };

    return (
        <div className="filter-bar">
            {/* Checkboxes para filtros */}
            <label>
                <input
                    type="checkbox"
                    name="tesouroSelic"
                    checked={filters.tesouroSelic}
                    onChange={handleCheckboxChange}
                />
                Tesouro Selic
            </label>
            <label>
                <input
                    type="checkbox"
                    name="tesouroPrefixado"
                    checked={filters.tesouroPrefixado}
                    onChange={handleCheckboxChange}
                />
                Tesouro Prefixado
            </label>
            <label>
                <input
                    type="checkbox"
                    name="tesouroIPCA"
                    checked={filters.tesouroIPCA}
                    onChange={handleCheckboxChange}
                />
                Tesouro IPCA+
            </label>
            <label>
                <input
                    type="checkbox"
                    name="tesouroRenda"
                    checked={filters.tesouroRenda}
                    onChange={handleCheckboxChange}
                />
                Tesouro Renda+
            </label>
            <label>
                <input
                    type="checkbox"
                    name="outros"
                    checked={filters.outros}
                    onChange={handleCheckboxChange}
                />
                Outros
            </label>
        
            {/* Campo de busca com botão */}
            <div className='search-container'>
                <input
                    id="busca"
                    type="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Busque por um título"
                />
                <button type="submit" className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    );
}
    
export default FilterBar;

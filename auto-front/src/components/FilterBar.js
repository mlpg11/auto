import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './FilterBar.css';

function FilterBar({ onFilterChange }) {
    const [filters, setFilters] = useState({
        tesouroSelic: true,
        tesouroPrefixado: true,
        tesouroIPCA: true,
        tesouroRenda: true,
        outros: true,
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters, [name]: checked };
            onFilterChange({ ...updatedFilters, searchTerm });
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
            <label id="tesouroSelic">
                <input
                    type="checkbox"
                    name="tesouroSelic"
                    checked={filters.tesouroSelic}
                    onChange={handleCheckboxChange}
                />
                Selic
            </label>
            <label id="tesouroPrefixado">
                <input
                    type="checkbox"
                    name="tesouroPrefixado"
                    checked={filters.tesouroPrefixado}
                    onChange={handleCheckboxChange}
                />
                Prefixado
            </label>
            <label id="tesouroIPCA">
                <input
                    type="checkbox"
                    name="tesouroIPCA"
                    checked={filters.tesouroIPCA}
                    onChange={handleCheckboxChange}
                />
                IPCA+
            </label>
            <label id="tesouroRenda">
                <input
                    type="checkbox"
                    name="tesouroRenda"
                    checked={filters.tesouroRenda}
                    onChange={handleCheckboxChange}
                />
                Renda+
            </label>
            <label id="outros">
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

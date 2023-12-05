import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './FilterBar.css';

function FilterBar2({ onFilterChange, options }) {
    const [filters, setFilters] = useState(options);
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
        <div className="filter-bar2">
            {/* Checkboxes para filtros */}
            <label id="tituloComprado">
                <input
                    type="checkbox"
                    name="tituloComprado"
                    checked={filters.tituloComprado}
                    onChange={handleCheckboxChange}
                />
                Titulo Comprado
            </label>
            <label id="tituloResgatado">
                <input
                    type="checkbox"
                    name="tituloResgatado"
                    checked={filters.tituloResgatado}
                    onChange={handleCheckboxChange}
                />
                Titulo Resgatado
            </label>
            <label id="trocaCriada">
                <input
                    type="checkbox"
                    name="trocaCriada"
                    checked={filters.trocaCriada}
                    onChange={handleCheckboxChange}
                />
                Troca Criada
            </label>
            <label id="trocaAceita">
                <input
                    type="checkbox"
                    name="trocaAceita"
                    checked={filters.trocaAceita}
                    onChange={handleCheckboxChange}
                />
                Troca Aceita
            </label>
            <label id="transferencia">
                <input
                    type="checkbox"
                    name="transferencia"
                    checked={filters.transferencia}
                    onChange={handleCheckboxChange}
                />
                Transferência
            </label>

            <div className='search-container'>
                <input
                    id="busca"
                    type="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Busque por uma wallet"
                />
                <button type="submit" className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    );
}
    
export default FilterBar2;

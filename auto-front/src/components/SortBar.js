import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import './SortBar.css';

const sortingOptions = {
    titulo: '',
    rentabilidade: '',
    vencimento: '',
    minimo: '',
    risco: '',
};

function SortBar({ onSortChange }) {
    const [sorting, setSorting] = useState(sortingOptions);

    const handleSortChange = (criteria) => {
        setSorting((prevSorting) => {
            const newDirection= prevSorting[criteria] === '' ? 'asc' : 
                                prevSorting[criteria] === 'asc' ? 'desc' : '';
            const newSorting = { ...prevSorting, [criteria]: newDirection };
            onSortChange(newSorting);
            return newSorting;
        });
    };

    const getButtonClass = (criteria) => {
        const direction = sorting[criteria];
        return direction === 'asc' ? 'asc' : direction === 'desc' ? 'desc' : '';
    };

    const getSortIcon = (criteria) => {
        const direction = sorting[criteria];
        if (direction === 'asc') {
            return faSortUp;
        } else if (direction === 'desc') {
            return faSortDown;
        } else {
            return faSort;
        }
    };

    return (
        <div className="sort-bar">
            <p className="texto">Ordenar por:</p>
            {Object.keys(sortingOptions).map((criteria) => (
                <button 
                    key={criteria} 
                    onClick={() => handleSortChange(criteria)}
                    className={getButtonClass(criteria)}
                >
                    {criteria.charAt(0).toUpperCase() + criteria.slice(1)}
                    <div className='spacer'></div>
                    <FontAwesomeIcon icon={getSortIcon(criteria)} />
                </button>
            ))}
        </div>
    );
}

export default SortBar;
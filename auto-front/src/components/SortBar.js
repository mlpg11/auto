import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import './SortBar.css';

function SortBar({ onSortChange , options}) {
    const [sorting, setSorting] = useState(options);

    const handleSortChange = (criteria) => {
        setSorting((prevSorting) => {
            const newSorting = { ...prevSorting }; // Cria uma cópia do estado anterior
    
            // Reseta os outros critérios antes de definir o novo
            Object.keys(newSorting).forEach(key => {
                if(key !== criteria) newSorting[key] = '';
            });
    
            newSorting[criteria] = newSorting[criteria] === 'asc' ? 'desc' : 'asc';
    
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
    
    const label = (criteria) => {
        if (criteria === 'rentabilidade_real') {
            return 'Rentabilidade';
        } 
        
        else if (criteria === 'valorFinal') {
            return 'Montante Final';
        }

        else {
            // Adiciona o return aqui para garantir que o valor seja retornado
            return criteria.charAt(0).toUpperCase() + criteria.slice(1);
        }
    }

    return (
        <div className="sort-bar">
            <p className="texto">Ordenar por:</p>
            {Object.keys(sorting).map((criteria) => (
                <button 
                    key={criteria} 
                    onClick={() => handleSortChange(criteria)}
                    className={getButtonClass(criteria)}
                >
                    {label(criteria)}
                    <div className='spacer'></div>
                    <FontAwesomeIcon icon={getSortIcon(criteria)} />
                </button>
            ))}
        </div>
    );
}

export default SortBar;

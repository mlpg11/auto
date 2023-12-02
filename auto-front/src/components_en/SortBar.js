import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import './SortBar.css';

function SortBar({ onSortChange , options}) {
    const [sorting, setSorting] = useState(options);

    const handleSortChange = (criteria) => {
        setSorting((prevSorting) => {

            for(const key in prevSorting){
                if(key == criteria) continue;
                
                if(prevSorting[key]!=''){
                    prevSorting[key]='';
                }
            }

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
    
    const label = (criteria) => {
        if (criteria === 'real_profitability') {
            return 'Profitability';
        } else {
            // Adiciona o return aqui para garantir que o valor seja retornado
            return criteria.charAt(0).toUpperCase() + criteria.slice(1);
        }
    }

    return (
        <div className="sort-bar">
            <p className="texto">Order by:</p>
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

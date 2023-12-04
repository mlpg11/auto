import React from 'react';
import MeuTitulo from './MeuTitulo';
import './ListaCards3.css';

function ListaCards3({cards}) {

    return (
        <div className='grid-titulos'>
            <MeuTitulo tipo={"selic"} rentabilidade={"12.25%"} nomeTitulo={"SELIC 2026"} nomeToken={"SC26"} vencimento={"18/06/2029"} quantia={"99.21"}></MeuTitulo>
            <MeuTitulo tipo={"ipca+"} rentabilidade={"12.25%"} nomeTitulo={"SELIC 2026"} nomeToken={"SC26"} vencimento={"18/06/2029"} quantia={"99.21"}></MeuTitulo>
            {/*cards.map((titulo) => (
                <MeuTitulo
                    tipo={titulo.tipo}
                    rentabilidade={titulo.rentabilidade}
                    nomeTitulo={titulo.nomeTitulo}
                    nomeToken={titulo.nomeToken}
                    vencimento={titulo.vencimento}
                    quantia={titulo.quantia}
                />
            ))*/}
        </div>
        
    );
}

export default ListaCards3;
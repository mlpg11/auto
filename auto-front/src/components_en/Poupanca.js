import React, { useState } from 'react';
import './Poupanca.css';

function Poupanca({ montanteFinal, totalInvestido, ganho }){

    return (
        <div className='container'>
            <div id='titulo'>
                <p>Performance with Poupança</p>
            </div>

            <div className='content'>
                <div className='sub-content'>
                    <p className='label'>Final Amount</p>
                    <p className='valor'>{montanteFinal}<span className='coin'>ETH</span></p>
                </div>
                <div className='sub-content'>
                    <p className='label'>Total Invested</p>
                    <p className='valor'>{totalInvestido}<span className='coin'>ETH</span></p>
                </div>
                <div className='sub-content'>
                    <p className='label'>Earning</p>
                    <p className='valor'>{ganho}<span className='coin'>ETH</span></p>               
                </div>
            </div>
        </div>
    );
}

export default Poupanca;
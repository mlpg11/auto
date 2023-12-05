import React from 'react';
import MeuTitulo2 from './MeuTitulo2';
import './ListaCards3.css';

function ListaCards4({ cards }) {
    // Verifica se cards está vazio ou nulo
    if (!cards || cards.length === 0) {
        return (
            <div className='grid-titulos'>
                <div className='vazio'>
                    <p>Carregando...</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className='grid-titulos'>
                {
                    /*
                    <MeuTitulo2 tipo={"tituloComprado"} nomeToken={"SL26"} qntToken={128.2} qntEth={200.0} receiverAdr={"0x123125125123"}/>
                    <MeuTitulo2 tipo={"tituloResgatado"} nomeToken={"PF29"} qntToken={52.3} qntEth={31.0} receiverAdr={"0x151416175123"}/>
                    <MeuTitulo2 tipo={"trocaCriada"} trocaID={"#291521"} nomeToken={"IPCA45"} qntToken={300} qntEth={912.3} senderAdr={"0x123125125123"}/>
                    <MeuTitulo2 tipo={"trocaAceita"} nomeToken={"SL26"} qntToken={621.2} qntEth={1031.0} receiverAdr={"0x123125125123"}/>
                    <MeuTitulo2 tipo={"transfer"} nomeToken={"RENDA30"} qntToken={154.0} senderAdr={"8x112bas5101"} receiverAdr={"0x123avna82"}/>
                    */
                }
                
                {cards.map((titulo, index) => (
                    <MeuTitulo2
                        key={index} // Adiciona uma chave única
                        tipo={titulo.tipo}
                        nomeToken={titulo.nomeToken}
                        qntToken={titulo.qntToken}
                        qntEth={titulo.qntEth}
                        receiverAdr={titulo.receiverAdr}
                        senderAdr={titulo.senderAdr}
                    />
                ))}
            </div>
        );
    }
}

export default ListaCards4;

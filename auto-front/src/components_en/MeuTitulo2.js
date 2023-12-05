import React, { useState } from "react";
import './MeuTitulo.css'

function MeuTitulo2 ({ id, nomeToken, qntToken, qntEth, tipo, senderAdr, receiverAdr }) {
    
    const tipoFormated = {
        TituloComprado: 'Título Comprado',
        TituloResgatado: 'Título Resgatado',
        TrocaCriada: 'Troca Criada',
        TrocaAceita: 'Troca Recebida',
        Transfer: 'Transferência'
    }

    const quantiaFormatada = qntToken ? Number(qntToken).toFixed(4) : '0.0000';

    return (
        <div className="mt-row2">
            <div className="mt-row-element2" id="mt1">
                <p className="mt-label">Type</p>
                <p>{tipoFormated[tipo] || '-'}</p>
            </div>

            <div className="h-spacer"></div>

            <div className="mt-row-element2" id="mt2">
                <p className="mt-label">ID</p>
                <p>{id || '-'}</p>
            </div>

            <div className="h-spacer"></div>

            <div className="mt-row-element2" id="mt3">
                <p className="mt-label">Token</p>
                <p>{nomeToken || '-'}</p>
            </div>
            
            <div className="h-spacer"></div>
            
            <div className="mt-row-element2" id="mt4">
                <p className="mt-label">Amount (Token)</p>
                <p>{quantiaFormatada || '-'}</p>
            </div>

            <div className="h-spacer"></div>
            
            <div className="mt-row-element2" id="mt5">
                <p className="mt-label">Amount (ETH)</p>
                <p>{qntEth || '-'}</p>
            </div>

            <div className="h-spacer"></div>

            <div className="mt-row-element2" id="mt6">
                <p className="mt-label">Sender</p>
                <p>{senderAdr || '-'}</p>
            </div>

            <div className="h-spacer"></div>

            <div className="mt-row-element2" id="mt7">
                <p className="mt-label">Receiver</p>
                <p>{receiverAdr || '-'}</p>
            </div>            
        </div>
    );
}

export default MeuTitulo2;
import React, { useState } from "react";
import Modal from 'react-modal';
import './MeuTitulo.css'
import Resgatar from './Modals/Resgatar';
import Trocar from './Modals/Trocar';


function MeuTitulo ({tipo, nomeTitulo, nomeToken, vencimento, rentabilidade, quantia }) {
    const [isTrocarModalOpen, setIsTrocarModalOpen] = useState(false);
    const [isResgatarModalOpen, setIsResgatarModalOpen] = useState(false);

    // Funções para abrir cada modal
    const openTrocarModal = () => setIsTrocarModalOpen(true);
    const openResgatarModal = () => setIsResgatarModalOpen(true);

    // Funções para fechar cada modal
    const closeTrocarModal = () => setIsTrocarModalOpen(false);
    const closeResgatarModal = () => setIsResgatarModalOpen(false);

    const getTipoClass = (tipo) => {
        const typeColorMap = {
            'selic': 'selic1',
            'prefixado': 'prefixado1',
            'ipca': 'ipca1',
            'renda+': 'renda1',
        };
        return typeColorMap[tipo.toLowerCase()] || 'default-header';
    };

    return (
        <div className="mt-row">
            <div className="mt-row-element" id="first">
                <div className={`borda ${getTipoClass(tipo)}`}>

                </div>
            </div>

            <div className="mt-row-element" id="aa1">
                <p className="mt-label">Título</p>
                <p>{nomeTitulo}</p>
            </div>
            
            <div className="h-spacer"></div>
            
            <div className="mt-row-element" id="aa2">
                <p className="mt-label">Token</p>
                <p>{nomeToken}</p>
            </div>

            <div className="h-spacer"></div>
            
            <div className="mt-row-element" id="aa3">
                <p className="mt-label">Vencimento</p>
                <p>{vencimento}</p>
            </div>

            <div className="h-spacer"></div>

            <div className="mt-row-element" id="aa4">
                <p className="mt-label">Rentabilidade</p>
                <p>{rentabilidade}</p>
            </div>

            <div className="h-spacer"></div>

            <div className="mt-row-element" id="aa5">
                <p className="mt-label">Quantia</p>
                <p>{parseFloat(quantia).toFixed(6)}</p>
            </div>

            <div className="h-spacer"></div>

            <div className="mt-row-element" id="aa6">
                <button onClick={openTrocarModal} className={`mtbutton ${getTipoClass(tipo)}`}>Trocar</button>
                <button onClick={openResgatarModal} className={`mtbutton ${getTipoClass(tipo)}`}>Resgatar</button>
            </div>

            <Modal
                isOpen={isTrocarModalOpen}
                onRequestClose={closeTrocarModal}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <Trocar
                    titulo={nomeTitulo}
                    token={nomeToken}
                    closeModal={closeTrocarModal}
                    quantia={quantia}>
                </Trocar>
            </Modal>

            <Modal
                isOpen={isResgatarModalOpen}
                onRequestClose={closeResgatarModal}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <Resgatar
                    titulo={nomeTitulo}
                    token={nomeToken}
                    quantia={quantia}
                    rentabilidade={rentabilidade}
                    closeModal={closeResgatarModal}>
                </Resgatar>
            </Modal>

        </div>
    );
}

export default MeuTitulo;
import React, { useState } from 'react';
import './Modal.css'; 
import graph from './graph.JPG';

function Comprar({ titulo, token, valorConversaoPublica, valorConversaoSecundario, closeModal, }) {
    const [tipoOferta, setTipoOferta] = useState('publica'); // 'publica' ou 'secundario'
    const [valorETH, setValorETH] = useState('');
    const [valorToken, setValorToken] = useState('');
    const [novoSaldo, setNovoSaldo] = useState('');
    console.log(titulo, token, valorConversaoPublica, valorConversaoSecundario);
    // Funções para manipular os inputs (você precisa adicionar a lógica de conversão aqui)

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={closeModal} className="close-button">&times;</button>
                <h2>{titulo} (<span className='purple-text'>{token}</span>)</h2>
                <div className="oferta-selector">
                    <button onClick={() => setTipoOferta('publica')} className={tipoOferta === 'publica' ? 'active' : ''}>OFERTA PÚBLICA</button>
                    <button onClick={() => setTipoOferta('secundario')} className={tipoOferta === 'secundario' ? 'active' : ''}>MERCADO SECUNDÁRIO</button>
                </div>
                <img src={graph} alt="Gráfico de desempenho" />
                <div className="conversao-rate">
                    <p>TAXA: {tipoOferta === 'publica' ? valorConversaoPublica : valorConversaoSecundario} <span className='purple-text'>ETH</span> → 1 <span className='purple-text'>{token}</span></p>
                </div>
                <div className="inputs">
                    <input
                        type="text"
                        value={valorETH}
                        onChange={(e) => setValorETH(e.target.value)}
                        placeholder="ETH"
                    />
                    <span className='purple-text'><p>ETH</p></span>
                    <p> → </p>
                    <input
                        type="text"
                        value={valorToken}
                        onChange={(e) => setValorToken(e.target.value)}
                        placeholder={`${token}`}
                    />
                    <span className='purple-text'><p>{token}</p></span>
                </div>
                <p>Novo saldo: {novoSaldo} Tokens <span className='purple-text'>${token}</span></p>
                <div className="modal-buttons">
                    <button className="detalhes-button">Detalhes</button>
                    <button className="comprar-button">Comprar</button>
                </div>
            </div>
        </div>
    );
}

export default Comprar;
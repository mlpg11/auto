import React, { useState } from 'react';
import './Modal.css'; 
import graph from './graph.JPG';
import abi from '../others/abi.json';

const { ethers } = require('ethers');

function Comprar({ titulo, token, valorConversaoPublica, valorConversaoSecundario, closeModal }) {
    const [tipoOferta, setTipoOferta] = useState('publica');
    const [valorETH, setValorETH] = useState('');
    const [valorToken, setValorToken] = useState('');
    const [novoSaldo, setNovoSaldo] = useState('');

    const calcularValorToken = (eth, valorConversao) => (eth / valorConversao).toFixed(4);
    const calcularValorETH = (tokens, valorConversao) => (tokens * valorConversao).toFixed(4);

    const handleValorETHChange = (e) => {
        const eth = e.target.value;
        const valorConversao = tipoOferta === 'publica' ? valorConversaoPublica : valorConversaoSecundario;
        setValorETH(eth);
        setValorToken(calcularValorToken(eth, valorConversao));
    };

    const handleValorTokenChange = (e) => {
        const tokens = e.target.value;
        const valorConversao = tipoOferta === 'publica' ? valorConversaoPublica : valorConversaoSecundario;
        setValorToken(tokens);
        setValorETH(calcularValorETH(tokens, valorConversao));
        setNovoSaldo(tokens);
    };

    const handleTipoOfertaChange = (novoTipo) => {
        setTipoOferta(novoTipo);
        const valorConversao = novoTipo === 'publica' ? valorConversaoPublica : valorConversaoSecundario;
        setValorToken(calcularValorToken(valorETH, valorConversao));
        // O novo saldo deve ser recalculado com a nova taxa de conversão
        setNovoSaldo(calcularValorToken(valorETH, valorConversao));
    };

    const handleComprarClick = async () => {
        let signer = null;

        let provider;

        if (window.ethereum == null){
            console.log("MetaMask not installed; using read-only defaults");
            provider = ethers.getDefaultProvider();
        }else{
            provider = new ethers.BrowserProvider(window.ethereum);
            signer = await provider.getSigner();
            const contractABI = [
                {
                "inputs": [],
                "name": "comprar",
                "outputs": [
                    {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                    }
                ],
                "stateMutability": "payable",
                "type": "function"
                }
            ];
            
            // let balance = await provider.getBalance();
            const erc20 = new ethers.Contract("0x9A86494Ba45eE1f9EEed9cFC0894f6C5d13a1F0b", contractABI, signer);
            let valorETHs = valorETH.toString();
            try{
                const tx = erc20.comprar({value: ethers.parseEther(valorETHs)});
                const receipt = provider.getTransactionReceipt(tx.hash);

                // const events = erc20.interface.parseLog(receipt.logs[0]);
                // console.log(events);
            }catch(error){
                console.log("error");
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={closeModal} className="close-button">&times;</button>
                <h2>{titulo} (<span className='purple-text'>{token}</span>)</h2>
                <div className="oferta-selector">
                    <button onClick={() => handleTipoOfertaChange('publica')} className={tipoOferta === 'publica' ? 'active' : ''}>OFERTA PÚBLICA</button>
                    <button onClick={() => handleTipoOfertaChange('secundario')} className={tipoOferta === 'secundario' ? 'active' : ''}>MERCADO SECUNDÁRIO</button>
                </div>
                <img src={graph} alt="Gráfico de desempenho" className="graph-img" />
                <div className="conversao-rate">
                    <p>TAXA: <span className='purple-text'>{tipoOferta === 'publica' ? valorConversaoPublica : valorConversaoSecundario} ETH</span> → 1 <span className='purple-text'>{token}</span></p>
                </div>
                <div className="inputs">
                    <input
                        type="number"
                        value={valorETH}
                        min="0"
                        onChange={handleValorETHChange}
                        placeholder="ETH"
                    />
                    <span className='purple-text'>ETH → </span>
                    <input
                        type="number"
                        value={valorToken}
                        onChange={handleValorTokenChange}
                        placeholder={token}
                    />
                    <span className='purple-text'>{token}</span>
                </div>
                <p>Novo saldo: <span className='purple-text'>{novoSaldo} Tokens {token}</span></p>
                <div className="modal-buttons">
                    <button className="detalhes-button">Detalhes</button>
                    <button className="comprar-button" onClick={handleComprarClick}>Comprar</button>
                </div>
            </div>
        </div>
    );
}

export default Comprar;

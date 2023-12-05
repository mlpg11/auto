import React, { useState } from 'react';
import './Modal.css'; 
import graph from './graph.JPG';

const { ethers, formatEther} = require('ethers');

const tokenContractAddresses = {
    'SL26': '0x10537D7bD661C9c34F547b38EC662D6FD482Ae95',
    'PF29': '0x8Aed6FE10dF3d6d981B101496C9c7245AE65cAEc',
    'IPCA29': '0x5f246ADDCF057E0f778CD422e20e413be70f9a0c',
    'IPCA35': '0xaD82Ecf79e232B0391C5479C7f632aA1EA701Ed1',
    'IPCA45': '0x4Dd5336F3C0D70893A7a86c6aEBe9B953E87c891',
    'PF26': '0x91A1EeE63f300B8f41AE6AF67eDEa2e2ed8c3f79',
    'RENDA30': '0xBe6Eb4ACB499f992ba2DaC7CAD59d56DA9e0D823',
    'RENDA35': '0x54287AaB4D98eA51a3B1FBceE56dAf27E04a56A6',
    'RENDA40': '0xE401FBb0d6828e9f25481efDc9dd18Da9E500983',
    'SL29': '0xb6aA91E8904d691a10372706e57aE1b390D26353'
};

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
                },
                {
                    "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];

            const erc20 = new ethers.Contract(tokenContractAddresses[token], contractABI, signer);
            let valorETHs = valorETH.toString();
            await erc20.comprar({value: ethers.parseEther(valorETHs)});
        }
        
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 id="modal-label">Comprar</h2>
                <button onClick={closeModal} className="close-button">&times;</button>
                <h2 id="modal-titulo">{titulo} (<span className='purple-text'>{token}</span>)</h2>
                <div className="oferta-selector">
                    <button onClick={() => handleTipoOfertaChange('publica')} className={tipoOferta === 'publica' ? 'active' : ''}>OFERTA PÚBLICA</button>
                    <button onClick={() => handleTipoOfertaChange('secundario')} className={tipoOferta === 'secundario' ? 'active' : ''}>MERCADO SECUNDÁRIO</button>
                </div>
                <img src={graph} alt="Gráfico de desempenho" className="graph-img" />
                <div className="conversao-rate">
                    <p>Taxa de Conversão: <span className='purple-text'>{tipoOferta === 'publica' ? valorConversaoPublica : valorConversaoSecundario} ETH</span> → 1 <span className='purple-text'>{token}</span></p>
                </div>
                <div className="inputs">
                    <input
                        type="number"
                        value={valorETH}
                        min={0}
                        onChange={handleValorETHChange}
                        placeholder="ETH"
                    />
                    <span className='purple-text'>ETH → </span>
                    <input
                        type="number"
                        value={valorToken}
                        onChange={handleValorTokenChange}
                        placeholder={token}
                        min={0}
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

export { Comprar, tokenContractAddresses };

import React, { useState } from 'react';
import './Modal.css'; 
import graph from './graph.JPG';
import { tokenContractAddresses } from './Comprar'

const { ethers, formatEther} = require('ethers');

function Trocar({ titulo, token, closeModal, quantia}) {
    const [valorWALLET, setValorWALLET] = useState('');
    const [valorETH, setValorETH] = useState('');
    const [valorToken, setValorToken] = useState('');

    const handleValorWALLETChange = (e) => {
        setValorWALLET(e.target.value);
    }

    const handleValorETHChange = (e) => {
        setValorETH(e.target.value);
    };

    const handleValorTokenChange = (e) => {
        if(e.target.value > quantia){
            setValorToken(quantia);
        } else {
            setValorToken(e.target.value);
        }
    };
    
    const handleTrocarClick = async () => {
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
                },
                {
                    "inputs": [
                      {
                        "internalType": "uint256",
                        "name": "_quantidadeTokens",
                        "type": "uint256"
                      },
                      {
                        "internalType": "uint256",
                        "name": "_quantidadeEthereum",
                        "type": "uint256"
                      }
                    ],
                    "name": "criarTroca",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  }
            ];

            const erc20 = new ethers.Contract(tokenContractAddresses[token], contractABI, signer);
            
            await erc20.criarTroca(quantia, valorETH);
        }
        
    };

    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 id="modal-label">Trocar</h2>
                <button onClick={closeModal} className="close-button">&times;</button>
                <h2 id="modal-titulo">{titulo} (<span className='purple-text'>{token}</span>)</h2>
                <p>Carteira Destino (OPCIONAL)</p>
                <div className="inputs">
                    <input
                            type="text"
                            value={valorWALLET}
                            min={0} 
                            max={quantia}
                            onChange={handleValorWALLETChange}
                            placeholder="WALLET"
                        />
                </div>
                <div className="conversao-rate">
                    <p>Quantia Atual: {quantia} <span className='purple-text'> {token}</span></p>
                </div>
                <div className="inputs">
                    <input
                        type="number"
                        value={valorToken}
                        min={0} 
                        max={quantia}
                        onChange={handleValorTokenChange}
                        placeholder={token}
                    />
                    <span className='purple-text'>{token} → </span>
                    <input
                        type="number"
                        value={valorETH}
                        min={0}
                        onChange={handleValorETHChange}
                        placeholder="ETH"
                    />
                    <span className='purple-text'>ETH</span>
                </div>
                <div className="modal-buttons">
                    <button className="comprar-button" onClick={handleTrocarClick}>Trocar</button>
                </div>
            </div>
        </div>
    );
}

export default Trocar;

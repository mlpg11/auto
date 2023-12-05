import React, { useState, useEffect } from 'react';
import './Modal.css'; 
import { useMetaMaskAccount } from '../MeusTokens';
import { tokenContractAddresses } from './Comprar'
const { ethers, formatEther} = require('ethers');

function Resgatar({ titulo, token, quantia, rentabilidade, closeModal }) {
    const [quantiaETH, setQuantiaETH] = useState(null);
    
    const wallet = useMetaMaskAccount();
    
    useEffect(() => {
        carregarDados();
    }, [token, quantia]);

    const carregarDados = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

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
                    "inputs": [],
                    "name": "valorConversao",
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

            try {
                const valorConversao = await erc20.valorConversao();
                const quantiaEmETH = quantia * (Number(valorConversao)/(10**18));
                setQuantiaETH(quantiaEmETH);
            } catch (error) {
                console.error("Erro ao buscar valorConversao:", error);
            }
        } else {
            console.log("MetaMask not installed; using read-only defaults");
        }
    };
    
    const handleResgatarClick = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();

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
                        "inputs": [],
                        "name": "valorConversao",
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
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                        ],
                        "stateMutability": "view",
                        "type": "function",
                        "name": "quantidadeDeDepositosPorUsuario",
                        "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                        ]
                    },
                    {
                        "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                        ],
                        "name": "depositos",
                        "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "valor",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "data",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rentabilidadeNoMomentoDoDeposito",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "quantidadeTitulos",
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
                        "name": "idDeposito",
                        "type": "uint256"
                    }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "resgatar"
                    }
                ];
    
                const erc20 = new ethers.Contract(tokenContractAddresses[token], contractABI, signer);
                
                let qntDepositos = await erc20.quantidadeDeDepositosPorUsuario(wallet);

                qntDepositos = Number(qntDepositos);

                for(let i = 0; i<qntDepositos; i++){
                    await erc20.resgatar(i);
                }
    
                console.log("Resgate realizado com sucesso.");

            } catch (error) {
                console.error("Erro ao resgatar:", error);
            }
        } else {
            console.log("MetaMask not installed");
        }
    };

    const quantiaFormatada = quantia ? Number(quantia).toFixed(4) : '0.0000';

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 id="modal-label">Resgatar</h2>
                <button onClick={closeModal} className="close-button">&times;</button>
                <h2 id="modal-titulo">{titulo} (<span className='purple-text'>{token}</span>)</h2>
                
                <p className='mlabel2'>Quantia</p>
                <p>{quantiaFormatada} <span className='purple-text'>{token}</span><br/>{quantiaETH ? quantiaETH.toFixed(4) : 'Carregando...'} <span className='purple-text'>ETH</span></p>
                
                <p className='mlabel2'>Rentabilidade</p>
                <p>{rentabilidade}<span className='purple-text'>%</span></p>
                
                <p className='mlabel2'>Impostos</p>
                <p>{}<span className='purple-text'>%</span></p>
                
                <p>Novo saldo: <span className='purple-text'>{quantiaETH} ETH</span></p>
                <div className="modal-buttons">
                    <button className="comprar-button" onClick={handleResgatarClick}>Resgatar</button>
                </div>
            </div>
        </div>
    );
}

export default Resgatar;

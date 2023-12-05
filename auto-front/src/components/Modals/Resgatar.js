import React, { useState, useEffect } from 'react';
import './Modal.css'; 
import { useMetaMaskAccount } from '../MeusTokens';
import { tokenContractAddresses } from './Comprar'
const { ethers } = require('ethers');

function Resgatar({ titulo, token, quantia, rentabilidade, closeModal}) {
    const [quantiaETH, setQuantiaETH] = useState(null);
    
    
    let wallet = useMetaMaskAccount();

    useEffect(() => {
        carregarDados();
    }, [token, quantia]);

    const carregarDadosOraculo = async () => {
        // IPCA e SELIC
        let oraculos = ["0x90E75f390332356426B60FB440DF23f860F6A113", "0x59c7D03d2E9893FB7bAa89dA50a9452e1e9B8b90"];

        const oraculosAbi = [
            {
                "inputs": [],
                "name": "ultimoUpdate",
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
                "name": "ultimoValor",
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
        ];

        let oraculoIpca, oraculoSelic;

        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            oraculoIpca = new ethers.Contract(oraculos[0], oraculosAbi, signer);
            oraculoSelic = new ethers.Contract(oraculos[1], oraculosAbi, signer);
        }
        
        try {
            let ultimoUpdateUnixIpca = await oraculoIpca.ultimoUpdate();
            let ultimoUpdateUnixSelic = await oraculoSelic.ultimoUpdate();

            let ultimoUpdatePercentageIpca = await oraculoIpca.ultimoValor();
            let ultimoUpdatePercentageSelic = await oraculoSelic.ultimoValor();

            console.log("ultimoUpdateUnixIpca: ", ultimoUpdateUnixIpca);
            console.log("ultimoUpdateUnixSelic: ", ultimoUpdateUnixSelic);
            console.log("ultimoUpdatePercentageIpca: ", ultimoUpdatePercentageIpca);
            console.log("ultimoUpdatePercentageSelic: ", ultimoUpdatePercentageSelic);
        }catch(error){

        }
    }

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
                },
                {
                    "inputs": [
                      {
                        "internalType": "uint256",
                        "name": "dias",
                        "type": "uint256"
                      }
                    ],
                    "name": "getImpostoDeRenda",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "pure",
                    "type": "function"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "uint256",
                        "name": "day",
                        "type": "uint256"
                      }
                    ],
                    "name": "getIof",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "pure",
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
                <p>{rentabilidade.toFixed(4)}<span className='purple-text'>%</span></p>
                
                <p>Saldo Transação: <span className='purple-text'>{quantiaETH ? quantiaETH.toFixed(4) : 'Carregando...'} ETH</span></p>
                <div className="modal-buttons">
                    <button className="comprar-button" onClick={handleResgatarClick}>Resgatar</button>
                </div>
            </div>
        </div>
    );
}

export default Resgatar;

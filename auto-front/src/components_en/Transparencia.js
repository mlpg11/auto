import React, { useEffect, useState } from 'react';
import Header from './Header';
import ListaCards4 from './ListaCards4';
import { applyFilters2, tokenContractAddresses} from './SelecionaCards';
import Footer from './Footer';
import { useLanguage } from '../LanguageContext';
import FilterBar2 from './FilterBar2';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { Trans } from 'react-i18next';

const { ethers, AbiCoder} = require('ethers');

const returnLog = async () => {
    // Create a new provider instance for the Arbitrum node
    const rpc = new ethers.JsonRpcProvider('https://auto-fork-arbitrum-production.up.railway.app/');

    const TituloCompradoTopic = ['0x5df3120f646622144afd420317de6c6346e982e24b89712a0da9d103f805a718'];

    const TituloResgatadoTopic = ['0xd1f21b939f8342d22df80e4cb2ec44e2bf0a863eac74ecfce44cf9b14c03e551'];

    const TrocaCriadaTopic = ['0x7bf3135a426a86aa7cfbf11ed85762a78c0d0da62c7b13c925281a722d6194fa'];

    const TrocaAceitaTopic = ['0xef30bd758146aefc4a511f7827890b11ec6d4bf1c56444a36463207c9e000529'];

    const TransferTopic = ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'];

    const GENESIS_FIRST_ROUTER = 18703218;
    const END_FIRST_ROUTER = await rpc.getBlockNumber();

    let cards = [];

    for(const addres of tokenContractAddresses){

        let filter, logs, card;
        
        filter = {
            address: addres,
            topics: TituloCompradoTopic,
            fromBlock: GENESIS_FIRST_ROUTER,
            toBlock: END_FIRST_ROUTER,
        };

        logs = await rpc.getLogs(filter);

        for (const log of logs) {
            const data = log.data;
    
            const logger =  AbiCoder.defaultAbiCoder().decode(['string', 'uint256', 'uint256', 'address'], data);
            
            let qntT = ethers.formatUnits(logger[1], 18);
            let qntE = ethers.formatUnits(logger[2], 18);
            
            card = {
                tipo: 'TituloComprado',
                trocaID: '',
                nomeToken: logger[0],
                qntToken: qntT,
                qntEth: qntE,
                senderAdr: logger[3],
                receiverAdr: ''
            }
            cards.push(card);
        }


        filter = {
            address: addres,
            topics: TituloResgatadoTopic,
            fromBlock: GENESIS_FIRST_ROUTER,
            toBlock: END_FIRST_ROUTER,
        };

        logs = await rpc.getLogs(filter);

        for (const log of logs) {
            const data = log.data;
    
            const logger =  AbiCoder.defaultAbiCoder().decode(['string', 'uint256', 'uint256', 'address'], data);
            
            let qntT = ethers.formatUnits(logger[1], 18);
            let qntE = ethers.formatUnits(logger[2], 18);

            card = {
                tipo: 'TituloResgatado',
                trocaID: '',
                nomeToken: logger[0],
                qntToken: qntT,
                qntEth: qntE,
                senderAdr: logger[3],
                receiverAdr: ''
            }
            cards.push(card);
        }


        filter = {
            address: addres,
            topics: TrocaCriadaTopic,
            fromBlock: GENESIS_FIRST_ROUTER,
            toBlock: END_FIRST_ROUTER,
        };

        logs = await rpc.getLogs(filter);

        for (const log of logs) {
            const data = log.data;
    
            const logger =  AbiCoder.defaultAbiCoder().decode(['uint256', 'uint256', 'uint256', 'address'], data);
            
            let qntT = ethers.formatUnits(logger[1], 18);
            let qntE = ethers.formatUnits(logger[2], 18);

            card = {
                tipo: 'TrocaCriada',
                trocaID : logger[0],
                nomeToken: '',
                qntToken: qntT,
                qntEth: qntE,
                senderAdr: logger[3],
                receiverAdr: ''
            }

            cards.push(card);
        }


        filter = {
            address: addres,
            topics: TrocaAceitaTopic,
            fromBlock: GENESIS_FIRST_ROUTER,
            toBlock: END_FIRST_ROUTER,
        };

        logs = await rpc.getLogs(filter);

        for (const log of logs) {
            const data = log.data;
    
            const logger =  AbiCoder.defaultAbiCoder().decode(['uint256', 'uint256', 'uint256', 'address'], data);

            let qntT = ethers.formatUnits(logger[1], 18);
            let qntE = ethers.formatUnits(logger[2], 18);

            card = {
                tipo: 'TrocaAceita',
                trocaID : logger[0],
                nomeToken: '',
                qntToken: qntT,
                qntEth: qntE,
                senderAdr: logger[3],
                receiverAdr: ''
            }
            cards.push(card);
        }

        filter = {
            address: addres,
            topics: TransferTopic,
            fromBlock: GENESIS_FIRST_ROUTER,
            toBlock: END_FIRST_ROUTER,
        };

        logs = await rpc.getLogs(filter);

        for (const log of logs) {
            const data = log.data;

            const logger =  AbiCoder.defaultAbiCoder().decode(['uint256'], data);
            
            const from = ethers.getAddress('0x' + log.topics[1].slice(-40));
            const to = ethers.getAddress('0x' + log.topics[2].slice(-40));

            let qntT = ethers.formatUnits(logger[0], 18);
            
            card = {
                tipo: 'Transfer',
                trocaID: '',
                nomeToken: '',
                qntToken: qntT,
                qntEth: 0,
                senderAdr: from,
                receiverAdr: to
            }
            cards.push(card);
        }

    }

    console.log(cards);
    return cards;

};

function Transparencia() {
    const { isEnglish } = useLanguage();
    const [currentCards, setCurrentCards] = useState([]);

    const [filters, setFilters] = useState({
        tituloComprado: true,
        tituloResgatado: true,
        trocaCriada: true,
        trocaAceita: true,
        transferencia: true
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };
    
    useEffect(() => {
        returnLog().then(cards => {
            setCurrentCards(applyFilters2(cards));
        });
    }, []);     

    const titleStyle = {
        marginBottom: '2%',
        fontSize: '2em',
        fontWeight: '200',
        marginLeft: '5%'
    }

    

    return (
        <div>
            <Header></Header>
            <h2 style={titleStyle}>Transparency Portal</h2>
            <FilterBar2 onFilterChange={handleFilterChange} options={filters}/>
            <ListaCards4 cards={currentCards}></ListaCards4>
            <Footer></Footer>
        </div>
    );
}

export default Transparencia;

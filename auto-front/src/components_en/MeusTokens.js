import React, { useEffect, useState } from 'react';
import Header from './Header';
import ListaCards3 from './ListaCards3';
import { getMeusCards, selectMeusCards } from './SelecionaCards';
import Footer from './Footer';

export function useMetaMaskAccount() {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const getAccount = async () => {
        if (window.ethereum) {
            try {
            // Solicitar acesso à conta se ainda não estiver disponível
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Definir a conta no estado
            setAccount(accounts[0]);
            } catch (error) {
            console.error('Erro ao obter conta da MetaMask:', error);
            }
        } else {
            console.log('MetaMask não está disponível');
        }
        };

        getAccount();
    }, []);

    return account;
}

function MeusTokensEn() {
    const account = useMetaMaskAccount();
    const [currentCards, setCurrentCards] = useState([]);

    useEffect(() => {
        if(account) {
            getMeusCards(account).then(selectedCards => {    
                setCurrentCards(selectedCards);
                console.log(selectedCards);
            });
        }
    }, [account]); //sorting filters dps

    const titleStyle = {
        marginBottom: '0',
        fontSize: '2em',
        fontWeight: '200',
        marginLeft: '5%',
        marginBottom: '2%',
    }

    return (
        <div>
            <Header></Header>
            <h2 style={titleStyle}>Minha Carteira</h2>
            <ListaCards3 cards={currentCards}/>
            <Footer></Footer>
        </div>
    );
}

export default MeusTokensEn;
import { ethers } from 'ethers';

const tokenContractAddresses = [ 
    '0x10537D7bD661C9c34F547b38EC662D6FD482Ae95',
    '0x8Aed6FE10dF3d6d981B101496C9c7245AE65cAEc',
    '0x5f246ADDCF057E0f778CD422e20e413be70f9a0c',
    '0xaD82Ecf79e232B0391C5479C7f632aA1EA701Ed1',
    '0x4Dd5336F3C0D70893A7a86c6aEBe9B953E87c891',
    '0x91A1EeE63f300B8f41AE6AF67eDEa2e2ed8c3f79',
    '0xBe6Eb4ACB499f992ba2DaC7CAD59d56DA9e0D823',
    '0x54287AaB4D98eA51a3B1FBceE56dAf27E04a56A6',
    '0xE401FBb0d6828e9f25481efDc9dd18Da9E500983',
    '0xb6aA91E8904d691a10372706e57aE1b390D26353'
]

const tokenAbi = [
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
        "name": "titulo",
        "outputs": [
            {
            "internalType": "string",
            "name": "",
            "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "tipo",
        "outputs": [
            {
            "internalType": "string",
            "name": "",
            "type": "string"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "vencimento",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ]
    },
    {
        "inputs": [],
        "name": "nomeToken",
        "outputs": [
            {
            "internalType": "string",
            "name": "",
            "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rentabilidade",
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

const getCards = async () => {
    const cards = [
        {
            id: '0',
            titulo: 'TESOURO SELIC 2026',
            tipo: 'selic',
            rentabilidade: 'SELIC + 0,0436%',
            rentabilidade_real: '12.29',
            vencimento: '01/03/2026',
            risco: 'Baixo',
            nomeToken: 'SL26',
            valorConversaoPublica: '1.38',
            valorSimulacao: 0
        },
        {
            id: '1',
            titulo: 'TESOURO IPCA+ 2029',
            tipo: 'ipca+',
            rentabilidade: 'IPCA + 5,46%',
            rentabilidade_real: '11.24',
            vencimento: '15/05/2029',
            risco: 'Baixo',
            nomeToken: 'IPCA29',
            valorConversaoPublica: '0.31',
            valorSimulacao: 0
        },
        {
            id: '2',
            titulo: 'TESOURO SELIC 2029',
            tipo: 'selic',
            rentabilidade: 'SELIC + 0,1718%',
            rentabilidade_real: '12.42',
            vencimento: '01/03/2029',
            risco: 'Médio',
            nomeToken: 'SL29',
            valorConversaoPublica: '1.37',
            valorSimulacao: 0
        },
        {
            id: '3',
            titulo: 'PREFIXADO 2029',
            tipo: 'prefixado',
            rentabilidade: '10,63%',
            rentabilidade_real: '10.63',
            vencimento: '01/01/2029',
            risco: 'Baixo',
            nomeToken: 'PF29',
            valorConversaoPublica: '0.059',
            valorSimulacao: 0
        },
        {
            id: '4',
            titulo: 'TESOURO IPCA+ 2045',
            tipo: 'ipca+',
            rentabilidade: 'IPCA + 5,75%',
            rentabilidade_real: '11.53',
            vencimento: '15/05/2045',
            risco: 'Médio',
            nomeToken: 'IPCA45',
            valorConversaoPublica: '0.12',
            valorSimulacao: 0
        },
        {
            id: '5',
            titulo: 'TESOURO IPCA+ 2035',
            tipo: 'ipca+',
            rentabilidade: 'IPCA + 5,62%',
            rentabilidade_real: '11.40',
            vencimento: '15/05/2035',
            risco: 'Médio',
            nomeToken: 'IPCA35',
            valorConversaoPublica: '0.22',
            valorSimulacao: 0
        },
        {
            id: '6',
            titulo: 'TESOURO RENDA+ 2030',
            tipo: 'renda+',
            rentabilidade: 'IPCA + 5,69%',
            rentabilidade_real: '11.47',
            vencimento: '15/12/2049',
            risco: 'Médio',
            nomeToken: 'RENDA30',
            valorConversaoPublica: '0.18',
            valorSimulacao: 0
        },
        {
            id: '7',
            titulo: 'TESOURO RENDA+ 2035',
            tipo: 'renda+',
            rentabilidade: 'IPCA + 5,75%',
            rentabilidade_real: '11.53',
            vencimento: '15/12/2054',
            risco: 'Médio',
            nomeToken: 'RENDA35',
            valorConversaoPublica: '0.13',
            valorSimulacao: 0
        },
        {
            id: '8',
            titulo: 'TESOURO RENDA+ 2040',
            tipo: 'renda+',
            rentabilidade: 'IPCA + 5,77%',
            rentabilidade_real: '11.55',
            vencimento: '15/12/2059',
            risco: 'Médio',
            nomeToken: 'RENDA40',
            valorConversaoPublica: '0.10',
            valorSimulacao: 0
        },
        {
            id: '9',
            titulo: 'PREFIXADO 2026',
            tipo: 'prefixado',
            rentabilidade: '10,10%',
            rentabilidade_real: '10.10',
            vencimento: '01/01/2026',
            risco: 'Baixo',
            nomeToken: 'PF26',
            valorConversaoPublica: '0.080',
            valorSimulacao: 0
        }
    ];
    return cards;
};

const applyFilters = (cards, filters) => {
    // Implemente a lógica de filtragem aqui

    let selicCards = [];
    let preCards = [];
    let ipcaCards = [];
    let rendaCards = [];

    for(const card of cards){
        if(card['tipo']==='selic'){
            selicCards.push(card);
        }
        if(card['tipo']==='prefixado'){
            preCards.push(card);
        }
        if(card['tipo']==='ipca+'){
            ipcaCards.push(card);
        }
        if(card['tipo']==='renda+'){
            rendaCards.push(card);
        }
    }

    let allCards = [];

    if(filters.tesouroSelic){
        allCards = allCards.concat(selicCards);
    }

    if(filters.tesouroPrefixado){
        allCards = allCards.concat(preCards);
    }

    if(filters.tesouroIPCA){
        allCards = allCards.concat(ipcaCards);
    }

    if(filters.tesouroRenda){
        allCards = allCards.concat(rendaCards);
    }

    return allCards;
};

const applyFilters2 = (cards, filters) => {
    // Implemente a lógica de filtragem aqui

    let tituloComprado = [];
    let tituloResgatado = [];
    let trocaCriada = [];
    let trocaAceita = [];
    let transfers = [];

    for(const card of cards){
        if(card['tipo']==='TituloComprado'){
            tituloComprado.push(card);
        }
        if(card['tipo']==='TituloResgatado'){
            tituloResgatado.push(card);
        }
        if(card['tipo']==='TrocaCriada'){
            trocaCriada.push(card);
        }
        if(card['tipo']==='TrocaAceita'){
            trocaAceita.push(card);
        }
        if(card['tipo']==='Transfer'){
            transfers.push(card);
        }
    }

    let allCards = [];

    if(filters.tituloComprado){
        allCards = allCards.concat(tituloComprado);
    }

    if(filters.tituloResgatado){
        allCards = allCards.concat(tituloResgatado);
    }

    if(filters.trocaCriada){
        allCards = allCards.concat(trocaCriada);
    }

    if(filters.trocaAceita){
        allCards = allCards.concat(trocaAceita);
    }

    if(filters.transferencia){
        allCards = allCards.concat(transfers);
    }

    return allCards;
};

/*
    sorting ou é 'asc' ou ' ' ou 'desc' asc pra crescente e desc pra decrescente
    sorting {titulo, rentabilidade, vencimento, risco}
*/ 

const Risco = {
    'Baixo' : 0,
    'Médio' : 1,
    'Alto' : 2
};

const sortBy = (key) => {
    return function(a, b){
        let a_r = a[key];
        let b_r = b[key];

        if(key==='risco'){
            a_r = Risco[a_r];
            b_r = Risco[b_r];
        }

        if(key==='vencimento'){
            let ano_a, mes_a, dia_a, ano_b, mes_b, dia_b;

            ano_a = a_r.substring(6, 10);
            mes_a = a_r.substring(3, 5);
            dia_a = a_r.substring(0, 2);

            ano_b = b_r.substring(6, 10);
            mes_b = b_r.substring(3, 5);
            dia_b = b_r.substring(0, 2);

            a_r = ano_a + '/' + mes_a + '/' + dia_a;
            b_r = ano_b + '/' + mes_b + '/' + dia_b;
        }

        return (a_r > b_r) - (a_r < b_r);
    };
};

const applySorting = (cards, sorting) => {
    // Implemente a lógica de ordenação aqui

    let chave = '';
    let order = 0;

    for(const key in sorting){
        let temp = sorting[key];
        if(temp!==''){
            chave = key;
            if(temp==='desc') order = 1;
        }
    }

    if(chave !== '') cards.sort(sortBy(chave));

    if(order){
        cards.reverse();
    }

    return cards;
};

const selectCards = (filters, sorting) => {
    return getCards()
        .then(cards => {
            let filteredCards = applyFilters(cards, filters);
            return applySorting(filteredCards, sorting);
        })
        .catch(error => {
            console.error("Erro ao selecionar cards:", error);
            return []; // Retorne um array vazio em caso de erro
        });
};

const getMeusCards = async (wallet) => {
    if (typeof window.ethereum !== 'undefined') {
        console.log(wallet);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const cards = [];
    
        for (const address of tokenContractAddresses) {
            const contract = new ethers.Contract(address, tokenAbi, signer);
            
            // Usamos o método balanceOf para obter o saldo do endereço da carteira
            const balance = await contract.balanceOf(wallet);
            
            if (!(balance == 0)) {
                const titulo = await contract.titulo();
                const tipo = await contract.tipo();
                const vencimentoTimestamp = await contract.vencimento();
                const nomeToken = await contract.nomeToken();
                const rentabilidade = await contract.rentabilidade();

                // Convertendo a quantia para Ether
                const quantia = ethers.formatUnits(balance, 18);

                // Convertendo o timestamp Unix para a data no formato "aaaa"
                const vencimentoDate = new Date(Number(vencimentoTimestamp) * 1000);
                const vencimentoFormatted = vencimentoDate.getFullYear();

                let rentabilidadeFormatted = Number(rentabilidade)/(10**22);
                rentabilidadeFormatted *= (10**12);
                rentabilidadeFormatted *= 31536000;
                
                cards.push({
                    address,
                    nomeTitulo: titulo,
                    tipo: tipo,
                    vencimento: vencimentoFormatted,
                    nomeToken,
                    rentabilidade: rentabilidadeFormatted, // Ajustar se necessário
                    quantia: quantia,
                });
            }
        }
        console.log(cards);
        return cards;
    } 
    
    else {
        console.log('MetaMask is not installed');
        return [];
    }
};

const selectMeusCards = async (wallet, sorting, filters) => {
    return getMeusCards(wallet)
        .then(cards => {
            console.log(cards);
            let filteredCards = applyFilters(cards, filters);
            return filteredCards;
        })
        .catch(error => {
            console.error("Erro ao selecionar cards:", error);
            return []; // Retorne um array vazio em caso de erro
        });
};
export { applySorting, applyFilters, getCards, selectCards, getMeusCards, tokenContractAddresses, applyFilters2};
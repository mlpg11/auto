const getCards = async () => {
    const cards = [
        {
            id: '0',
            title: 'SELIC TITLE 2026',
            tipo: 'selic',
            profitability: 'SELIC + 0,0436%',
            real_profitability: '12.25',
            due: '01/03/2026',
            risk: 'Low',
            nomeToken: 'SL26',
            valorConversaoPublica: '1.38',
            valorConversaoSecundario: '1.47'
        },
        {
            id: '1',
            title: 'IPCA+ TITLE 2029',
            tipo: 'ipca+',
            profitability: 'IPCA + 5,46%',
            real_profitability: '10.46',
            due: '15/05/2029',
            risk: 'Low',
            nomeToken: 'IP29',
            valorConversaoPublica: '0.31',
            valorConversaoSecundario: '0.39'
        },
        {
            id: '2',
            title: 'SELIC TITLE 2029',
            tipo: 'selic',
            profitability: 'SELIC + 0,1718%',
            real_profitability: '12.45',
            due: '01/03/2029',
            risk: 'Medium',
            nomeToken: 'SL29',
            valorConversaoPublica: '1.37',
            valorConversaoSecundario: '1.47'
        },
        {
            id: '3',
            title: 'PREFIXED TITLE 2029',
            tipo: 'prefixado',
            profitability: '10,63%',
            real_profitability: '10.63',
            due: '01/01/2029',
            risk: 'Low',
            nomeToken: 'PF29',
            valorConversaoPublica: '0.059',
            valorConversaoSecundario: '0.069'
        },
        {
            id: '4',
            title: 'IPCA+ TITLE 2045',
            tipo: 'ipca+',
            profitability: 'IPCA + 5,75%',
            real_profitability: '10.75',
            due: '15/05/2045',
            risk: 'Medium',
            nomeToken: 'IP45',
            valorConversaoPublica: '0.12',
            valorConversaoSecundario: '0.20'
        },
        {
            id: '5',
            title: 'IPCA+ TITLE 2035',
            tipo: 'ipca+',
            profitability: 'IPCA + 5,62%',
            real_profitability: '10.62',
            due: '15/05/2035',
            risk: 'Medium',
            nomeToken: 'IP35',
            valorConversaoPublica: '0.22',
            valorConversaoSecundario: '0.29'
        },
        {
            id: '6',
            title: 'RENDA+ TITLE 2030',
            tipo: 'renda+',
            profitability: 'IPCA + 5,69%',
            real_profitability: '10.69',
            due: '15/12/2049',
            risk: 'Medium',
            nomeToken: 'RM30',
            valorConversaoPublica: '0.18',
            valorConversaoSecundario: '0.24'
        },
        {
            id: '7',
            title: 'RENDA+ TITLE 2035',
            tipo: 'renda+',
            profitability: 'IPCA + 5,75%',
            real_profitability: '10.75',
            due: '15/12/2054',
            risk: 'Medium',
            nomeToken: 'RM35',
            valorConversaoPublica: '0.13',
            valorConversaoSecundario: '0.23'
        },
        {
            id: '8',
            title: 'RENDA+ TITLE 2040',
            tipo: 'renda+',
            profitability: 'IPCA + 5,77%',
            real_profitability: '10.77',
            due: '15/12/2059',
            risk: 'Low',
            nomeToken: 'RM40',
            valorConversaoPublica: '0.10',
            valorConversaoSecundario: '0.20'
        },
        {
            id: '9',
            title: 'PREFIXED TITLE 2026',
            tipo: 'prefixado',
            profitability: '10,10%',
            real_profitability: '10.10',
            due: '01/01/2026',
            risk: 'Low',
            nomeToken: 'PF26',
            valorConversaoPublica: '0.080',
            valorConversaoSecundario: '0.098'
        }
    ];
    return cards;
};


// TODO DEFINIR UM RENTABILIDADE REAL OCULTO NO CARD
/*
    cards {int id, string titulo, int tipo, string rentabilidade, string vencimento, string risco}
    filters {bool tesouroSelic, bool tesouroPrefixado, bool tesouroIPCA, bool tesouroRenda,, string searchTerm}

    vc pode usar console.log(cards ou filters) pra testar
*/
const applyFilters = (cards, filters) => {
    // Implemente a lógica de filtragem aqui

    let selicCards = [];
    let preCards = [];
    let ipcaCards = [];
    let rendaCards = [];

    for(const card of cards){
        if(card['tipo']=='selic'){
            selicCards.push(card);
        }
        if(card['tipo']=='prefixado'){
            preCards.push(card);
        }
        if(card['tipo']=='ipca+'){
            ipcaCards.push(card);
        }
        if(card['tipo']=='renda+'){
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

/*
    sorting ou é 'asc' ou ' ' ou 'desc' asc pra crescente e desc pra decrescente
    sorting {titulo, rentabilidade, vencimento, risco}
*/ 

const Risco = {
    'Low' : 0,
    'Medium' : 1,
    'High' : 2
};

const sortBy = (key) => {
    return function(a, b){
        let a_r = a[key];
        let b_r = b[key];

        if(key=='risk'){
            a_r = Risco[a_r];
            b_r = Risco[b_r];
        }

        if(key=='due'){
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

    let chave;
    let order = 0;

    for(const key in sorting){
        let temp = sorting[key];
        if(temp!=''){
            chave = key;
            if(temp=='desc') order = 1;
        }
    }

    cards.sort(sortBy(chave));

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
            console.error("Error selecting cards:", error);
            return []; // Retorne um array vazio em caso de erro
        });
};

export { selectCards };
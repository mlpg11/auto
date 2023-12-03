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
            nomeToken: 'IP29',
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
            nomeToken: 'IP45',
            valorConversaoPublica: '0.12',
            valorSimulacao: 0
        },
        {
            id: '5',
            titulo: 'TESOURO IPCA+ 2035',
            tipo: 'ipca+',
            rentabilidade: 'IPCA + 5,62%',
            rentabilidade_real: '11.4',
            vencimento: '15/05/2035',
            risco: 'Médio',
            nomeToken: 'IP35',
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
            nomeToken: 'RM30',
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
            nomeToken: 'RM35',
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
            nomeToken: 'RM40',
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

export { applySorting, getCards, selectCards };
const getCards = async () => {
    const cards = [
        {
            id: '0',
            titulo: 'TESOURO SELIC 2026',
            tipo: 'selic',
            rentabilidade: 'SELIC + 0,0436% a.a',
            rentabilidade_real: '12.25',
            vencimento: '01/03/2026',
            investimento_minimo: 'R$ 141,22',
            risco: 'Baixo'
        },
        {
            id: '1',
            titulo: 'CDB Banco C6',
            tipo: 'outros',
            rentabilidade: '116% do CDI',
            rentabilidade_real: '14.67',
            vencimento: '30/11/2027',
            investimento_minimo: 'R$ 100,00',
            risco: 'Baixo'
        },
        {
            id: '2',
            titulo: 'TESOURO IPCA+ 2029',
            tipo: 'ipca+',
            rentabilidade: 'IPCA + 5,46% a.a',
            rentabilidade_real: '10.46',
            vencimento: '15/05/2029',
            investimento_minimo: 'R$ 31,20',
            risco: 'Médio'
        },
        {
            id: '3',
            titulo: 'TESOURO SELIC 2029',
            tipo: 'selic',
            rentabilidade: 'SELIC + 0,1718%',
            rentabilidade_real: '12,45',
            vencimento: '01/03/2029',
            investimento_minimo: 'R$ 140,09',
            risco: 'Médio'
        },
        {
            id: '4',
            titulo: 'CDB BLB',
            tipo: 'outros',
            rentabilidade: '119% CDI',
            rentabilidade_real: '15.05',
            vencimento: '01/11/2028',
            investimento_minimo: 'R$ 100,00',
            risco: 'Baixo'
        },
        {
            id: '5',
            titulo: 'PREFIXADO 2029',
            tipo: 'prefixado',
            rentabilidade: '10,63% a.a',
            rentabilidade_real: '10.63',
            vencimento: '01/01/2029',
            investimento_minimo: 'R$ 35,93',
            risco: 'Baixo'
        },
        {
            id: '6',
            titulo: 'TESOURO IPCA+ 2045',
            tipo: 'ipca+',
            rentabilidade: 'IPCA + 5,75%',
            rentabilidade_real: '10.75',
            vencimento: '15/05/2045',
            investimento_minimo: 'R$ 37,78',
            risco: 'Médio'
        },
        {
            id: '7',
            titulo: 'TESOURO IPCA+ 2035',
            tipo: 'ipca+',
            rentabilidade: 'IPCA + 5,62% a.a',
            rentabilidade_real: '10.62',
            vencimento: '15/05/2035',
            investimento_minimo: 'R$ 44,61',
            risco: 'Médio'
        },
        {
            id: '8',
            titulo: 'TESOURO RENDA+ 2030',
            tipo: 'renda+',
            rentabilidade: 'IPCA + 5,69% a.a',
            rentabilidade_real: '10.69',
            vencimento: '15/12/2049',
            investimento_minimo: 'R$ 36,06',
            risco: 'Médio'
        },
        {
            id: '9',
            titulo: 'TESOURO RENDA+ 2035',
            tipo: 'renda+',
            rentabilidade: 'IPCA + 5,75% a.a',
            rentabilidade_real: '10.75',
            vencimento: '15/12/2054',
            investimento_minimo: 'R$ 40,60',
            risco: 'Médio'
        },
        {
            id: '10',
            titulo: 'TESOURO RENDA+ 2040',
            tipo: 'renda+',
            rentabilidade: 'IPCA + 5,77% a.a',
            rentabilidade_real: '10.77',
            vencimento: '15/12/2059	',
            investimento_minimo: 'R$ 30,59',
            risco: 'Médio'
        },
        {
            id: '11',
            titulo: 'PREFIXADO 2026',
            tipo: 'prefixado',
            rentabilidade: '10,10% a.a',
            rentabilidade_real: '10.10',
            vencimento: '01/01/2026',
            investimento_minimo: 'R$ 32,68',
            risco: 'Baixo'
        }
    ];
    return cards;
};


// TODO DEFINIR UM RENTABILIDADE REAL OCULTO NO CARD
/*
    cards {int id, string titulo, int tipo, string rentabilidade, string vencimento, string investimento_minimo, string risco}
    filters {bool tesouroSelic, bool tesouroPrefixado, bool tesouroIPCA, bool tesouroRenda, bool outros, string searchTerm}

    vc pode usar console.log(cards ou filters) pra testar
*/
const applyFilters = (cards, filters) => {
    // Implemente a lógica de filtragem aqui
    console.log(filters);
    return cards;
};

/*
    sorting ou é 'asc' ou ' ' ou 'desc' asc pra crescente e desc pra decrescente
    sorting {titulo, rentabilidade, vencimento, minimo, risco}
*/ 


const applySorting = (cards, sorting) => {
    // Implemente a lógica de ordenação aqui
    console.log(sorting);  
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

export { selectCards };
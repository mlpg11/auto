const getCards = async () => {
    const cards = [
        {
            id: '0',
            titulo: 'Tesouro Selic',
            tipo: 'selic',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '1',
            titulo: 'Tesouro Selic',
            tipo: 'prefixado',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '2',
            titulo: 'Tesouro Selic',
            tipo: 'ipca+',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '3',
            titulo: 'Tesouro Selic',
            tipo: 'renda+',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '4',
            titulo: 'Tesouro Selic',
            tipo: 'outros',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '5',
            titulo: 'Tesouro Selic',
            tipo: 'renda+',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '6',
            titulo: 'Tesouro Selic',
            tipo: 'ipca+',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        },
        {
            id: '7',
            titulo: 'Tesouro Selic',
            tipo: 'renda+',
            rentabilidade: '3,42% a.a',
            vencimento: '15/07/2025',
            investimento_minimo: 'R$ 152,00',
            risco: 'Médio'
        }
    ];
    return cards;
};

/*
    cards {int id, string titulo, int tipo, string rentabilidade, string vencimento, string investimento_minimo, string risco}
    filters {bool tesouroSelic, bool tesouroPrefixado, bool tesouroIPCA, bool tesouroRenda, bool outros, string searchTerm}

    vc pode usar console.log(cards ou filters) pra testar
*/
const applyFilters = (cards, filters) => {
    // Implemente a lógica de filtragem aqui
    console.log(cards);
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